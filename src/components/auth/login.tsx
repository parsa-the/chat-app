"use client"
{/*add reset password functionality */}
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
    <form onSubmit={handlesubmit}>
      <input
        type="email"
        name="email"
        value={LoginData.email}
        placeholder="Enter Email"
        onChange={handleChange}
        required
      ></input>
      <input
        name="password"
        type="password"
        value={LoginData.password}
        placeholder="Enter password"
        onChange={handleChange}
        required
      ></input>
      <button>Login</button>
    </form>
  );
};

export default Login;
