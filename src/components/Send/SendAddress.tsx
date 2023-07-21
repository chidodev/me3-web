import React from "react";
import Image from "next/image";

const SendAddress = () => {
  return (
    <div className="h-1/7 flex flex-row items-center space-x-5 rounded-md bg-[#261840] p-1">
      <div className="flex w-4/5 flex-col space-y-1 pl-2">
        <div className="text-sm pl-3 text-[#DCCBF2]">Send to</div>
        <input
          className="text-sm h-1/4 appearance-none border-none bg-[#261840] text-[#DCCBF2]"
          type="text"
          placeholder="Enter a public address 0x..."
        />
      </div>
      <div className="bg- flex h-10 w-10 items-center justify-center">
        <Image src="/clipboard.svg" alt="clipboard_logo" height={20} width={20} />
      </div>
    </div>
  );
};

export default SendAddress;
