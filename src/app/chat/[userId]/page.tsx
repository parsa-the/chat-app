import ChatWind from "@/components/chat/chat";

async function ChatPage({ params }: { params: { userId: string } }) {
  const { userId } = await params;
  return (
    <div className="h-full flex flex-col">
      <ChatWind userid={userId} />
    </div>
  );
}
export default ChatPage;
