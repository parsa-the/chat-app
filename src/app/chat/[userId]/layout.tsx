import Users from "@/components/users/users";
import ChatWind from "@/components/chat/chat";
export default function chatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row h-screen">
      {/* sidebar */}
      <aside className="hidden sm:block w-2/5 border-r">
        <Users></Users>
      </aside>

      {/* chat window */}

      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
