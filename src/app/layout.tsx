import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Chat App",
  description:
    "A real-time chat app built with Next.js, Tailwind CSS, and Supabase.",
  keywords: [
    "Next.js",
    "React",
    "Web Development",
    "Frontend",
    "Chat App",
    "Realtime",
    "Open Source",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-black dark:text-white min-h-screen transition-colors duration-300">
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
