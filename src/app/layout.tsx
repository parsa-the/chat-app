import "./globals.css";
import { Toaster } from "react-hot-toast";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">

      <body className="dark:bg-black">
        <Toaster position="bottom-right"/>
        {children}</body>
    </html>
  );
}
