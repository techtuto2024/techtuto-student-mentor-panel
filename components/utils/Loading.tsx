import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-80 z-50">
      <div className="relative">
        <div className="w-48 h-48 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/techtuto-logo.png"
            alt="Loading..."
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
