import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
const Toggle = () => {
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
    <button
      onClick={handleDarkMode}
      aria-label="toggle dark mode"
      className={` w-20 h-11 border-2  rounded-full   flex items-center justify-center gap-x-2 ${
        darkMode
          ? " bg-linear-30 from-yellow-200 to-yellow-500 border-yellow-600"
          : " bg-linear-20 from-blue-500 to-blue-200 border-blue-300"
      }`}
    >
      <motion.div
        initial={{ x: darkMode ? 17 : -17 }}
        animate={{ x: darkMode ? 17 : -17 }}
        className={` p-2 rounded-full ${darkMode?"bg-linear-30 from-yellow-500 to-yellow-300 ":"bg-linear-30 from-blue-500 to-blue-300"}`}
      >
        <Image
          src={darkMode ? "/resorces/sun.svg" : "/resorces/moon.svg"}
          height={20}
          width={20}
          className="w-5"
          alt={darkMode ? "sun image" : "moon image"}
          priority
        ></Image>
      </motion.div>
    </button>
  );
};

export default Toggle;
