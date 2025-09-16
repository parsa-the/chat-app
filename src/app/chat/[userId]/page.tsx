import ChatWind from "@/components/chat/chat";

export default function ChatPage({ params }: { params: { userId: string } }) {
  const { userId } = params;
  return <ChatWind userid={userId} />;
}
