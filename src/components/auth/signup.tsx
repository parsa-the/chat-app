"use client";
import { useState } from "react";

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
    e.preventDefault;
    // llllllllllllllllllllllll
    {/* supabase later */}
    console.log(FormData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name={"email"}
          value={FormData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
        ></input>
        <input
          type="password"
          name={"password"}
          value={FormData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        ></input>
        <input
          type="password"
          name={"confirmPassword"}
          value={FormData.confirmPassword}
          onChange={handleChange}
          placeholder="Repeat password"
          required
        ></input>
        <input
          type="text"
          name={"displayName"}
          value={FormData.displayName}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        ></input>
        <button type="submit">Sign up</button>
      </form>
      <p>{JSON.stringify(FormData)}</p>
    </>
  );
};

export default Signup;
