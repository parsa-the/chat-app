"use client";
import { useState } from "react";
import Link from "next/link";
const Signup = () => {
  type FormState = {
    email: string;
    password: string;
    confirmPassword: string;
    displayName: string;
  };

  const [FormData, setFormData] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // llllllllllllllllllllllll
    {
      /* supabase later */
    }
    if (FormData.password !== FormData.confirmPassword) {
      alert("repeated password doesn't match"); //toast laterrrrrrrrrrrrrrrr
      return;
    }
    console.log(FormData);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center p-10 w-100 mx-auto mt-20 rounded-lg space-y-10 shadow-xl border border-gray-200"
      >
        <input
          type="email"
          name={"email"}
          value={FormData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="p-2 w-70 border rounded-sm font-normal"
          required
        ></input>
        <input
          type="password"
          name={"password"}
          value={FormData.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="p-2 w-70 border rounded-sm font-normal"
          required
        ></input>
        <input
          type="password"
          name={"confirmPassword"}
          value={FormData.confirmPassword}
          onChange={handleChange}
          placeholder="Repeat password"
          className="p-2 w-70 border rounded-sm font-normal"
          required
        ></input>
        <input
          type="text"
          name={"displayName"}
          value={FormData.displayName}
          onChange={handleChange}
          placeholder="Enter your name"
          className="p-2 w-70 border rounded-sm font-normal"
          required
        ></input>
        <button type="submit"  className="bg-black text-white p-2 font-medium w-70 transition duration-300 ease-in-out rounded-sm active:bg-gray-700 hover:bg-gray-800">Sign up</button>
        <p>
          alrady have an account? <Link href="/login" className="text-blue-600">Log in</Link>
        </p>
      </form>
    </>
  );
};

export default Signup;
