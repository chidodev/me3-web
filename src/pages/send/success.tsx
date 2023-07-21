import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

import SendTitle from "@/components/Send/SendTitle";

const Success = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col items-center  bg-[#10081E]">
      <div className="mt-3 flex h-4/5 w-1/3 flex-col flex-col space-y-3 rounded-xl">
        <SendTitle />
        <div className="flex h-3/5 flex-col items-center space-y-5">
          <div className="flex h-1/4 w-1/5 items-center justify-center rounded-full bg-[#261840]">
            <Image src="/tick.svg" alt="tick_logo" height={30} width={30} />
          </div>
          <div>Your transaction is on the way!</div>
          <div className="text-xs flex flex-row space-x-1">
            <div className="text-[#DCCBF2]">Check the status of your transaction on </div>
            <div className="text-[#9957E5]">PolygonScan</div>
          </div>
          <div className="flex flex-row items-center justify-center space-x-2">
            <div className="flex flex-row items-center space-x-1">
              <div>1.4882375</div>
              <div>
                <Image src="/PolyIcon.svg" alt="polyicon" height={20} width={20} />
              </div>
              <div>MATIC</div>
            </div>
            <div>
              <Image src="/rightarr.svg" alt="rightArr" height={10} width={10} />
            </div>
            <div className="flex justify-center">
              <p className="break-all...">0xae35055897140B923f3w</p>
            </div>
          </div>
          <div
            className="flex w-full cursor-pointer items-center justify-center rounded-md bg-[#9957E5] p-4"
            onClick={() => router.push("/dashboard")}
          >
            Done
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
