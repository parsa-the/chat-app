import Users from "@/components/users/users";

function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col sm:flex-row h-screen w-full dark:bg-black bg-white">
      <aside className="hidden sm:flex sm:w-2/5 lg:w-1/3 border-r border-gray-300 dark:border-gray-700 shadow-sm">
        <Users />
      </aside>
      <main className="flex-1 flex flex-col w-full sm:w-auto">
        {children}
      </main>
    </div>
  );
}

export default ChatLayout;
