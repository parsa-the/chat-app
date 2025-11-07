"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import ChatSkeleton from "../loadings/chatskeleton";
import toast from "react-hot-toast";

type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
};

type Profile = {
  id: string;
  display_name?: string;
  avatar_url?: string;
};

function ChatWind({ userid }: { userid: string }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${currentUserId},receiver_id.eq.${userid}),and(sender_id.eq.${userid},receiver_id.eq.${currentUserId})`
        )
        .order("created_at");

      if (error) throw error;
      setMessages(data || []);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          toast.error("User not found");
          return;
        }

        setCurrentUserId(user.id);

        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("id, display_name, avatar_url")
          .eq("id", userid)
          .single();

        if (error) throw error;
        setProfile(profileData);
      } catch {
        toast.error("Failed to load chat data");
      }
    };

    loadData();
  }, [userid]);

  useEffect(() => {
    if (!currentUserId) return;

    loadMessages();

    const channel = supabase
      .channel(`chat:${[currentUserId, userid].sort().join("-")}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        ({ new: msg }: { new: Message }) => {
          if (
            (msg.sender_id === currentUserId && msg.receiver_id === userid) ||
            (msg.sender_id === userid && msg.receiver_id === currentUserId)
          ) {
            setMessages((prev) => [...prev, msg]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, userid]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    if (!input.trim() || !currentUserId) return;

    try {
      await supabase.from("messages").insert({
        sender_id: currentUserId,
        receiver_id: userid,
        content: input,
      });
      setInput("");
      await loadMessages();
    } catch {
      toast.error("Failed to send message");
    }
  };

  if (loading) return <ChatSkeleton />;

  const avatarUrl = profile?.avatar_url?.startsWith("http")
    ? profile.avatar_url
    : "/Default-profile-pic.png";

  return (
    <div className="flex flex-col h-screen sm:h-full bg-gray-50 dark:bg-zinc-900 shadow-lg rounded-xl border border-gray-200 dark:border-zinc-800">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-t-xl">
        <Link href="/chat" className="sm:hidden text-blue-500 text-2xl">
          ←
        </Link>
        <Image
          src={avatarUrl}
          width={44}
          height={44}
          priority
          alt="avatar"
          className="rounded-full object-cover border border-gray-200 dark:border-zinc-700"
        />
        <div className="font-semibold text-gray-900 dark:text-white text-lg truncate">
          {profile?.display_name || "Unknown User"}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar bg-gray-50 dark:bg-zinc-950"
      >
        {messages.map((msg) => {
          const isMine = msg.sender_id === currentUserId;
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 max-w-xs md:max-w-md rounded-2xl text-sm shadow-sm ${
                  isMine
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-none"
                    : "bg-zinc-200 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded-bl-none"
                }`}
              >
                <p className="break-words whitespace-pre-wrap">{msg.content}</p>
                <p className="text-xs mt-1 opacity-70 text-right">
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

      {/* Input Area */}
      <div className="flex items-center gap-3 p-3 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-b-xl">
        <input
          className="flex-1 bg-transparent border-none rounded-md px-3 py-2 text-md focus:outline-none dark:text-white"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={send}
          className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-zinc-800 transition"
        >
          <Image src="/sent.png" height={22} width={22} alt="Send" />
        </motion.button>
      </div>
    </div>
  );
}

export default ChatWind;
