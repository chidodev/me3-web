import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Review = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center  bg-[#10081E]">
      <div className="mt-3">Review Send</div>
      <div className="mt-3 flex h-3/5 w-1/3 flex-col flex-col space-y-3 rounded-xl">
        <div className="flex flex-col space-y-1 rounded-md bg-[#261840] p-1 pl-3">
          <div className="text-xs text-[#DCCBF2]">Recipient</div>
          <div>0xae35055897140B923f345g4355</div>
        </div>
        <div className="flex h-1/6 flex-col justify-center rounded-md bg-[#261840]">
          <div className="flex flex-col space-y-2 pl-3">
            <div className="text-xs text-[#DCCBF2]">Asset</div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center space-x-2">
                <Image src="/PolyIcon.svg" alt="PolyIcon" height={30} width={30} />
                <div>MATIC</div>
              </div>
              <div className="pr-3">1.4882375</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 rounded-md bg-[#261840] p-3">
          <div className="text-xs flex flex-row justify-between">
            <div className="text-main-accent">Estimated Fees</div>
            <div className="text-[#BB8CF2]">0.12345 MATIC</div>
          </div>
          <div className="text-xs flex flex-row justify-between">
            <div className="text-main-accent">Total</div>
            <div className="text-[#BB8CF2]">1.4882375 MATIC</div>
          </div>
        </div>
        <div className="flex flex-row justify-center space-x-5">
          <div className="flex w-1/2 cursor-pointer items-center justify-center rounded-md bg-[#261840]">Reject</div>
          <div
            className="flex w-1/2 cursor-pointer flex-row items-center justify-center rounded-md bg-[#9957E5] p-4"
            onClick={() => router.push("/send/success")}
          >
            <Image src="/sendReview.svg" alt="sendReview_logo" height={20} width={20} />
            <div>Send</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
