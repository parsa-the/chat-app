"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Toggle from "./toggle";
import { supabase } from "../../../lib/supabaseClient";
const Menu = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.09 }}
      style={{ transformOrigin: "top" }}
      className="absolute dark:bg-black dark:text-white bg-white ml-5 flex flex-col border w-40 items-center py-4 space-y-3 rounded-lg border-gray-300 shadow-md shadow-gray-400"
    >
      <Toggle />
      <div className="border-t border-gray-400 w-32" />

      <button
        onClick={handleLogout}
        className="w-full text-center text-red-500"
      >
        Logout
      </button>
    </motion.div>
  );
};

export default Menu;
