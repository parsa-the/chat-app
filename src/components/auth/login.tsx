"use client";

import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";

type LoginTypes = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginTypes>({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error || !data.user) {
        toast.error(error?.message || "Login failed");
        setSubmitting(false);
        return;
      }

      router.push("/chat");
    } catch {
      toast.error("Unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-zinc-900 px-4">
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full max-w-md p-8 rounded-2xl shadow-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 space-y-6"
      >
        <h1 className="font-semibold   text-3xl sm:text-4xl dark:text-white text-gray-900 mb-10">
          Login
        </h1>

        <div className="w-full space-y-4">
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="p-3 w-full border dark:border-zinc-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder-gray-400"
          />

          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="p-3 w-full border dark:border-zinc-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full font-bold py-3 mt-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md transition duration-300 ease-in-out disabled:opacity-50"
        >
          {submitting ? "Logging in…" : "Login"}
        </button>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don’t have an account?
          <Link href="/signup" className="text-blue-600 hover:underline ml-1">
            Sign up
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
