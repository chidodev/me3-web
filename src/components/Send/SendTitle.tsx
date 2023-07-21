import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const SendTitle = () => {
  const router = useRouter();
  return (
    <div className="flex h-1/6 w-full flex-row items-center space-x-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#261840]">
        <div onClick={() => router.push("/dashboard")} className="cursor-pointer">
          <Image src="/arrowback.svg" alt="BackArrow_Logo" height={15} width={15} />
        </div>
      </div>
      <div className="text-3xl">Send</div>
    </div>
  );
};

export default SendTitle;
