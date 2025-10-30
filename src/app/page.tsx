"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const Home = () => {
  const Router = useRouter();
  useEffect(() => {
    if (
      window.location.hostname === "chat-app-gules-six-85.vercel.app" ||
      "http://localhost:3000"
    )
      Router.push("/login");
  }, [Router]);
  return <></>;
};
export default Home;
