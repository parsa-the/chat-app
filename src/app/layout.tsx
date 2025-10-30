import "./globals.css";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Chat app",
  description: "realtime chat app with next js,tailwind,supabase",
  keywords: [
    "nextjs",
    "react",
    "web development",
    "frontend",
    "front-end",
    "junior",
    "chat app",
    "open source",
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="dark:bg-black">
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
