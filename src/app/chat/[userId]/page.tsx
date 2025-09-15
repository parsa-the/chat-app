import ChatWind from "@/components/chat/chat";

export default async function ChatPage({ params }: { params: { userId: string }}) {
  const { userId } = await params;
  return <ChatWind userid={userId} />;
  
}
