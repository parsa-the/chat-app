import React from "react";

const ChatSkeleton = () => {
  const messagesArray = Array.from({ length: 6 });

  return (
    <div className="flex flex-col h-full shadow-gray-300 shadow-lg rounded-lg border border-gray-300">
      <div className="flex items-center p-3 shadow-md shadow-gray-300 bg-gray-400 rounded-lg">
        <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
        <div className="ml-3 w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 no-scrollbar scroll-smooth space-y-3">
        {messagesArray.map((_, idx) => {
          const isMine = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 h-17 py-2 rounded-lg max-w-3xs md:max-w-xl bg-gray-300 animate-pulse ${
                  isMine ? "ml-auto" : "mr-auto"
                }`}
              >
                <div className="h-4 w-44 mb-1 bg-gray-400 rounded"></div>
                <div className="h-3 w-16 mt-4 m  bg-gray-400 rounded"></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 p-2 m-2 rounded-xl shadow-sm shadow-gray-400 border border-gray-400 lg:w-2xl w-xs mx-auto">
        <div className="flex-1 h-10 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
