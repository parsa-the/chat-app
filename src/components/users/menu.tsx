"use client";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";

const Menu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.09 }}
      className="absolute bg-white ml-5 flex flex-col border w-40 items-center py-4 space-y-3 rounded-lg border-gray-300 shadow-md shadow-gray-400"
    >
      <Link href="/profile">Profile</Link>
      <div className="border-t border-gray-400 w-32" />

      <div>Dark/Light</div>
      <div className="border-t border-gray-400 w-32" />

      <Link href="/login">Logout</Link>
    </motion.div>
  );
};

export default Menu;
