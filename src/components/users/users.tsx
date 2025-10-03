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
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      try {
        const { data: authData, error: authError } =
          await supabase.auth.getUser();
        if (authError || !authData?.user) {
          toast.error("Failed to get current user");
          return;
        }

        const currentUserId = authData.user.id;
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .neq("id", currentUserId);

        if (error) throw error;
        if (mounted) setUsers(data || []);
      } catch (err: unknown) {
        console.error(err);
        toast.error("Error fetching users");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();
    return () => {
      mounted = false;
    };
  }, []);

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
    if (!user.avatar_url) return "/Default-profile-pic.png";
    try {
      new URL(user.avatar_url);
      return user.avatar_url;
    } catch {
      return "/Default-profile-pic.png";
    }
  };

  const filteredUsers = users.filter((user) =>
    getDisplayName(user).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <UserSkeleton />;

  return (
    <div className="flex-1 h-screen sm:h-160 no-scrollbar scroll-smooth overflow-y-auto p-2 rounded-lg shadow-gray-500 shadow-md m-2 dark:bg-black border-gray-300 border">
      <div className="flex items-center justify-center gap-3 lg:gap-8 p-2 border-b border-gray-400 mb-4 pb-4 ">
        <div ref={menuRef} className="relative">
          <div
            onClick={() => setMenu((prev) => !prev)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-900 cursor-pointer"
          >
            <Image src="/menu.png" width={7} height={7} alt="menu" />
          </div>
          {menu && <Menu />}
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Link key={user.id} href={`/chat/${user.id}`}>
              <div className="flex flex-row mt-2 dark:bg-black dark:border-gray-500 dark:text-gray-300 bg-gray-100 rounded-xl m-2 shadow border border-gray-300 space-x-4 max-w-xl mx-auto p-2 items-center hover:bg-gray-200 dark:hover:bg-zinc-900 transition">
                <Image
                  src={getAvatarUrl(user)}
                  height={50}
                  width={50}
                  priority
                  alt={`${getDisplayName(user)}'s profile`}
                  className="rounded-full bg-gray-400 object-cover w-12 h-12 object-center"
                />
                <div className="flex flex-col space-y-1">
                  <p className="font-medium">{getDisplayName(user)}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-gray-500 text-center">
            {searchTerm
              ? `No users found matching "${searchTerm}"`
              : "No users found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
