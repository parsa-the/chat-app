"use client"
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
const Complete = () => {
  return (
    <>
      <div className=" flex items-center h-screen flex-col space-y-4 dark:bg-black">
        <motion.h1 initial={{opacity:0,y:-50}} animate={{opacity:1,y:0}} className="text-center mt-24 dark:text-white font-semibold text-5xl">You&apos;re All set!</motion.h1>
        <motion.p initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} className="text-center font-normal text-zinc-500 dark:text-zinc-400   text-2xl">
          Account created<br></br> successfully
        </motion.p>
        <Link href={"/login"} className="mt-20 bg-linear-10 from-green-400 to-green-950 bg-green-400 font-semibold transition-shadow ease-in-out  hover:shadow-xl p-3 px-6 text-white rounded-lg border-2 border-green-800  shadow-green-400/20  ">go back to login</Link>
      </div>
    </>
  );
};

export default Complete;
