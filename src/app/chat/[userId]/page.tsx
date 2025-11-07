import ChatWind from "@/components/chat/chat";

async function ChatPage({ params }: { params: { userId: string } }) {
  const { userId } = await params;

  return (
    <div className="flex flex-col h-full w-full sm:h-screen sm:overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <ChatWind userid={userId} />
      </div>
    </div>
  );
}

export default ChatPage;
