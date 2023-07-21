import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

const SendButton = () => {
  const router = useRouter();
  return (
    <div
      className="flex h-1/6 cursor-pointer flex-row items-center justify-center space-x-3 rounded-md bg-[#261840]"
      onClick={() => router.push("/send/review")}
    >
      <Image src="/sendarrow.png" alt="send_logo" height={15} width={10} />
      <div>Review Send</div>
    </div>
  );
};

export default SendButton;
