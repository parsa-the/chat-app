"use client";
{
  /*add reset password functionality */
}
import Link from "next/link";
import React, { useState } from "react";
type LoginTypes = {
  email: string;
  password: string;
};
const Login = () => {
  const [LoginData, setLoginData] = useState<LoginTypes>({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handlesubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="w-screen">
      <form
        onSubmit={handlesubmit}
        className="flex flex-col items-center justify-center p-10 w-100 mx-auto mt-40 rounded-lg space-y-10 shadow-xl border border-gray-200"
      >
        <input
          type="email"
          name="email"
          value={LoginData.email}
          placeholder="Enter Email"
          onChange={handleChange}
          className="p-2 w-70 border rounded-sm font-normal"
          required
        ></input>
        <input
          name="password"
          type="password"
          value={LoginData.password}
          placeholder="Enter password"
          onChange={handleChange}
          className="p-2 font-normal w-70 border rounded-sm"
          required
        ></input>
        <button className="bg-black text-white p-2 font-medium w-70 transition duration-300 ease-in-out rounded-sm active:bg-gray-700 hover:bg-gray-800">Login</button>
        <p >dont have an account? <Link href={"/signup"} className="text-blue-600">Create an account</Link></p>
      </form>

    </div>
  );
};

export default Login;
