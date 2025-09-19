"use client";

import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
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
        alert(error?.message || "Login failed");
        setSubmitting(false);
        return;
      }

      router.push("/chat"); // Redirect to chat page after login
    } catch {
      alert("Unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-screen">
      <motion.form
      initial={{scale:0}}
      animate={{scale:1}}
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center p-10 max-w-sm mx-auto mt-32 rounded-lg space-y-6 shadow-xl border border-gray-200"
      >
        <h1 className="font-semibold text-3xl mb-6">Login</h1>

        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
          className="p-2 w-full border rounded-sm"
        />

        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          className="p-2 w-full border rounded-sm"
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white p-2 font-medium w-full transition duration-300 ease-in-out rounded-sm active:bg-gray-700 hover:bg-gray-800 disabled:opacity-50"
        >
          {submitting ? "Logging in…" : "Login"}
        </button>

        <p className="mt-3">
          Dont have an account?
          <Link href="/signup" className="text-blue-600 ml-1">
            Create an account
          </Link>
        </p>
        <p></p>
      </motion.form>
    </div>
  );
};

export default Login;
