"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const host = window.location.hostname;
    const allowedHosts = ["chat-app-gules-six-85.vercel.app", "localhost"];

    if (allowedHosts.includes(host)) {
      router.push("/login");
    }
  }, [router]);

  return null;
};

export default Home;
