"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
};

type Profile = { id: string; display_name?: string; avatar_url?: string };

export default function ChatWind({ userid }: { userid: string }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      if (!currentUser) return;

      setUser(currentUser.id);
      const { data } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .eq("id", userid)
        .single();
      setProfile(data);
    };
    loadData();
  }, [userid]);

  useEffect(() => {
    if (!user) return;

    const loadMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${user},receiver_id.eq.${userid}),and(sender_id.eq.${userid},receiver_id.eq.${user})`
        )
        .order("created_at");
      setMessages(data || []);
    };

    const channel = supabase
      .channel(`chat:${[user, userid].sort().join("-")}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        ({ new: msg }: { new: Message }) => {
          if (
            (msg.sender_id === user && msg.receiver_id === userid) ||
            (msg.sender_id === userid && msg.receiver_id === user)
          ) {
            setMessages((prev) => [...prev, msg]);
          }
        }
      )
      .subscribe();

    loadMessages();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, userid]);

  const send = async () => {
    if (!input.trim() || !user) return;
    await supabase.from("messages").insert({
      sender_id: user,
      receiver_id: userid,
      content: input,
    });
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center bg-gray-200 p-3 border-b shadow">
        <Link href="/chat" className="sm:hidden mr-2 text-blue-500 text-3xl">
          ←
        </Link>
        <Image
          src={
            profile?.avatar_url && profile.avatar_url.startsWith("http")
              ? profile.avatar_url
              : "/profile.png"
          }
          width={40}
          height={40}
          alt="avatar"
          className="rounded-full"
        />
        <p className="ml-3 font-medium">{profile?.display_name || "..."}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {messages.map((msg) => {
          const isMine = msg.sender_id === user;
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                isMine ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  isMine ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
              >
                <p>{msg.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-2 p-3">
        <input
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={send}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </motion.button>
      </div>
    </div>
  );
}
