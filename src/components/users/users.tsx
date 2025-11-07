"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import Menu from "./menu";
import UserSkeleton from "../loadings/usersskeleton";
import toast from "react-hot-toast";
import SearchBar from "./search";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: authData, error: authError } =
          await supabase.auth.getUser();
        if (authError || !authData?.user) {
          toast.error("Failed to get current user");
          return;
        }

        const currentUserId = authData.user.id;

const { data: usersData, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("is_verified", true) // ✅ only verified users
  .neq("id", currentUserId);


        if (error) throw error;
        setUsers(usersData || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Helpers
  const getDisplayName = (user: User): string =>
    user.display_name ??
    user.name ??
    user.full_name ??
    user.username ??
    user.email?.split("@")[0] ??
    "Unknown User";

  const getAvatarUrl = (user: User): string => {
    const url = user.avatar_url;
    if (!url) return "/Default-profile-pic.png";
    try {
      new URL(url);
      return url;
    } catch {
      return "/Default-profile-pic.png";
    }
  };

  const filteredUsers = users.filter((user) =>
    getDisplayName(user).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <UserSkeleton />;

  return (
    <div className="flex-1 h-full sm:h-screen overflow-y-auto no-scrollbar p-3 m-2 rounded-xl border border-gray-300 shadow-md dark:bg-black dark:border-gray-700 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between max-w-2xl mx-auto gap-4 p-3 border-b border-gray-300 dark:border-gray-600 mb-4">
        {/* Menu */}
        <div ref={menuRef} className="flex items-center">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-900 transition flex items-center justify-center"
          >
            <Image src="/menu.png" width={6} height={5} alt="Menu" />
          </button>
          {menuOpen && (
            <div className="absolute z-50 top-12 left-0">
              <Menu />
            </div>
          )}
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </div>
      </div>

      {/* User list */}
      <div className="space-y-2 max-w-2xl mx-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Link
              key={user.id}
              href={`/chat/${user.id}`}
              className="flex items-center gap-3 dark:bg-zinc-900 bg-gray-100 rounded-lg p-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              <Image
                src={getAvatarUrl(user)}
                height={50}
                width={50}
                priority
                alt={`${getDisplayName(user)}'s profile`}
                className="rounded-full object-cover w-12 h-12"
              />
              <div className="flex flex-col">
                <p className="font-medium dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  {getDisplayName(user)}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-6 text-gray-500 text-center dark:text-gray-400">
            {searchTerm
              ? `No users found matching “${searchTerm}”`
              : "No users found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
