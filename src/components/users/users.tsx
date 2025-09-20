"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

type User = {
  id: string;
  display_name?: string;
  username?: string;
  full_name?: string;
  name?: string;
  avatar_url?: string;
  email?: string;
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData?.user) throw new Error("Failed to get current user");

        const currentUserId = authData.user.id;
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .neq("id", currentUserId);

        if (error) throw error;
        if (mounted) setUsers(data || []);
      } catch (err: any) {
        console.error(err);
        if (mounted) setError(err.message || "An error occurred");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();
    return () => {
      mounted = false;
    };
  }, []);

  // Always prefer display_name, then fallbacks
  const getDisplayName = (user: User): string => {
    return (
      user.display_name ||
      user.name ||
      user.full_name ||
      user.username ||
      user.email?.split("@")[0] ||
      "Unknown User"
    );
  };

  const getAvatarUrl = (user: User): string => {
    if (!user.avatar_url) return "/profile.png";
    try {
      new URL(user.avatar_url);
      return user.avatar_url;
    } catch {
      return "/profile.png";
    }
  };

  const filteredUsers = users.filter((user) =>
    getDisplayName(user).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="p-4 text-center">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 h-screen overflow-y-auto p-2">
      <div className="p-6 border-b">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Link key={user.id} href={`/chat/${user.id}`}>
              <div className="flex flex-row mt-2 bg-gray-100 rounded-xl m-2 shadow border border-gray-300 space-x-4 max-w-xl mx-auto p-2 items-center hover:bg-gray-200 transition">
                <Image
                  src={getAvatarUrl(user)}
                  height={50}
                  width={50}
                  alt={`${getDisplayName(user)}'s profile`}
                  className="rounded-full bg-gray-400 object-cover w-12 h-12"
                />
                <div className="flex flex-col space-y-1">
                  <p className="font-medium">{getDisplayName(user)}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-gray-500 text-center">
            {searchTerm ? `No users found matching "${searchTerm}"` : "No users found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
