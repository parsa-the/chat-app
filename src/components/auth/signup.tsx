"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import toast from "react-hot-toast";

const Signup = () => {
  type FormState = {
    email: string;
    password: string;
    confirmPassword: string;
    displayName: string;
  };

  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setSubmitting(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError || !authData.user) {
        toast.error(authError?.message || "Signup failed");
        setSubmitting(false);
        return;
      }

      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          username: formData.displayName,
          display_name: formData.displayName,
          email: formData.email,
          last_seen: new Date().toISOString(),
        },
      ]);

      if (profileError) {
        if (profileError.code === "23505") {
          toast.error("That username is already taken, please choose another one.");
        } else {
          toast.error("Failed to create profile");
          console.log(profileError);
        }
        setSubmitting(false);
        return;
      }

      toast.success("Signup successful! Please check your email for confirmation.");
      router.push("/login");
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
        <h1 className="font-semibold text-3xl sm:text-4xl dark:text-white text-gray-900 mb-10">
          Create an account
        </h1>

        <div className="w-full space-y-4">
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            className="p-3 w-full border dark:border-zinc-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder-gray-400"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="p-3 w-full border dark:border-zinc-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder-gray-400"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            className="p-3 w-full border dark:border-zinc-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder-gray-400"
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat password"
            required
            className="p-3 w-full border dark:border-zinc-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3  mt-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-md transition duration-300 ease-in-out disabled:opacity-50"
        >
          {submitting ? "Signing up…" : "Sign up"}
        </button>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?
          <Link href="/login" className="text-blue-600  hover:underline ml-1">
            Log in
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Signup;
