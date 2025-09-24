import React from "react";

const UserSkeleton = () => {
  // Generate a few skeleton rows
  const skeletonArray = Array.from({ length: 9 }); // 5 placeholders

  return (
    <div className="flex-1 h-170 no-scrollbar scroll-smooth overflow-y-auto p-2 rounded-lg shadow-gray-300 shadow-lg m-2 border-gray-300 border">
      <div className="flex items-center gap-3 lg:gap-8 p-2 border-b border-gray-400 mb-4 pb-4">
        <div className="w-7 h-9 rounded-md bg-gray-300 animate-pulse"></div>
        <div className="flex-1 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>

      <div className="space-y-4">
        {skeletonArray.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-gray-100 rounded-xl m-2 shadow border border-gray-300 p-2 max-w-xl mx-auto animate-pulse"
          >
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSkeleton;
