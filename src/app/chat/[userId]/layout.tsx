import Users from "@/components/users/users";
export default function chatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row h-screen dark:bg-black">
      <aside className="hidden sm:block w-2/5">
        <Users></Users>
      </aside>
      <div className=" my-auto h-160 border border-gray-300 "></div>
      
      <main className="flex-1 flex flex-col sm:m-2 ">{children}</main>
    </div>
  );
}
