import ChatWind from "@/components/chat/chat";

async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = await params;
  return <ChatWind userid={userId} />;
}
export default ChatPage;
