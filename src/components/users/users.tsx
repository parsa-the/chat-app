"use client";

import React, { useState } from "react";
import { Usersa } from "../../../lib/users";
import Image from "next/image";
import Link from "next/link";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = Usersa.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 h-screen overflow-y-auto p-2">
      {/* Search input */}
      <div className="p-6 border-b">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Users list */}
      <div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Link key={user.id} href={`/chat/${user.id}`}>
              <div className="flex flex-row mt-2 bg-gray-100 rounded-xl m-2 shadow border border-gray-300 space-x-4 max-w-xl mx-auto p-2 items-center">
                <Image
                  src="/profile.png"
                  height={50}
                  width={50}
                  alt="User Profile"
                  className="rounded-full bg-gray-400 object-cover w-12 h-12"
                />
                <div className="flex flex-col space-y-1">
                  <p>{user.name}</p>
                  <p>{user.lastMessage}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-gray-500 text-center">
            No users found
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;