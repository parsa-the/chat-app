"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

const Menu = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.09 }}
      className="absolute dark:bg-black dark:text-white bg-white ml-5 flex flex-col border w-40 items-center py-4 space-y-3 rounded-lg border-gray-300 shadow-md shadow-gray-400"
    >
      <button
        onClick={handleDarkMode}
        className="cursor-pointer w-full hover:opacity-70 flex items-center justify-center gap-x-2"
      >
        <Image src={darkMode?"/resorces/sun.png":"/resorces/moon.png"} height={20} width={20} alt={darkMode?"sun image":"moon image"}>

        </Image>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="border-t border-gray-400 w-32" />

      <Link href="/login" className="w-full text-center text-red-500">
        Logout
      </Link>
    </motion.div>
  );
};

export default Menu;
