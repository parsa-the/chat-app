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
        toast.error (authError?.message || "Signup failed");
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
        toast.error("Failed to create profile");
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
    <motion.form
      initial={{scale:0}}
      animate={{scale:1}}
      onSubmit={handleSubmit}
      className=" flex flex-col items-center justify-center p-10 max-w-sm mx-auto mt-20 rounded-lg space-y-6 shadow-xl border border-gray-200 "
    >
      <h1 className="font-semibold text-3xl mb-6">Create an account</h1>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter Email"
        required
        className="p-2 w-full border rounded-sm"
      />

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter password"
        required
        className="p-2 w-full border rounded-sm"
      />

      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Repeat password"
        required
        className="p-2 w-full border rounded-sm"
      />

      <input
        type="text"
        name="displayName"
        value={formData.displayName}
        onChange={handleChange}
        placeholder="Enter your name"
        required
        className="p-2 w-full border rounded-sm"
      />

      <button
        type="submit"
        disabled={submitting}
        className="bg-black text-white p-2 font-medium w-full transition duration-300 ease-in-out rounded-sm active:bg-gray-700 hover:bg-gray-800 disabled:opacity-50"
      >
        {submitting ? "Signing up…" : "Sign up"}
      </button>

      <p>
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600">
          Log in
        </Link>
      </p>
    </motion.form>
  );
};

export default Signup;
