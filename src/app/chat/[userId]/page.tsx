import ChatWind from "@/components/chat/chat";

export default function ChatPage({ params }: { params: { userId: string } }) {
  return <ChatWind userid={params.userId} />;
  
}
