"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const Toggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const handleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <button
      onClick={handleDarkMode}
      aria-label="toggle dark mode"
      className={`w-20 h-11 border-2 rounded-full flex items-center justify-center gap-x-2 transition-colors
        ${
          darkMode
            ? "bg-gradient-to-r from-yellow-200 to-yellow-500 border-yellow-600"
            : "bg-gradient-to-r from-blue-500 to-blue-200 border-blue-300"
        }`}
    >
      <motion.div
        animate={{ x: darkMode ? 17 : -17 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={`p-2 rounded-full transition-colors
          ${
            darkMode
              ? "bg-gradient-to-r from-yellow-500 to-yellow-300"
              : "bg-gradient-to-r from-blue-500 to-blue-300"
          }`}
      >
        <Image
          src={darkMode ? "/resorces/sun.svg" : "/resorces/moon.svg"}
          alt={darkMode ? "Sun icon" : "Moon icon"}
          width={20}
          height={20}
          priority
        />
      </motion.div>
    </button>
  );
};

export default Toggle;
