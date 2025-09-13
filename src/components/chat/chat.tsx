"use client";
import React from "react";
import { motion } from "motion/react";
import { Chats } from "../../../lib/chat";
import { Usersa } from "../../../lib/users";
import Image from "next/image";
import Link from "next/link";
const ChatWind = ({ userid }: { userid: string }) => {
  const currentUserId = 1; //jfjknjfkakjfajfjkasajkdas
  const currentUser = Usersa.find((user) => user.id === +userid);
  return (
    <div className=" flex flex-col h-full">
      <div className="flex space-x-2 mt-2">
        <Link href="/chat" className=" sm:hidden">
          <button className="text-blue-500 text-3xl ml-4 mr-1">← </button>
        </Link>
        {currentUser && (
          <div className="flex space-x-4">
            <Image
              src={currentUser.profile || "./public/globe.svg"}
              height={30}
              width={30}
              alt="profile"
              className="rounded-full"
            ></Image>
            <p>{currentUser.name}</p>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {Chats.map((chat) => {
          const isMyMessage = chat.senderId === currentUserId;

          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={chat.id}
              className={`flex ${
                isMyMessage ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`mr-3 ml-3 max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isMyMessage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex space-x-3"
                >
                  <p>{chat.text}</p>
                  <p className="text-xs mt-2 opacity-70">{chat.time}</p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex space-x-3 mt-5 mx-auto mb-5">
        <input
          type="text"
          placeholder="Type a message..."
          className="shadow-lg border border-gray-300 shadow-gray-400 pt-3 pb-3 pl-3 rounded-lg w-60 sm:w-90 lg:w-190 active:border-blue-500"
        />
        <motion.button
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.93 }}
          className="shadow-sm bg-blue-600 text-white p-3 rounded-xl border-2 border-blue-200 shadow-blue-400 "
        >
          Send
        </motion.button>
      </div>
    </div>
  );
};

export default ChatWind;
