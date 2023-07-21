import React from "react";
import Image from "next/image";

const SendAmount = () => {
  return (
    <div className="flex h-1/4 flex-row items-center justify-between rounded-md bg-[#261840]">
      <div className="flex flex-col space-y-2 pl-5">
        <div className="text-[#DCCBF2]">Asset</div>
        <div className="flex flex-row">
          <Image src="/PolyIcon.svg" alt="PolyIcon" height={30} width={30} />
          {/* <Dropdown label="Matic" color="#261840"></Dropdown> */}
        </div>
        <div className="text-sm text-[#DCCBF2]">Balance:1.503034 MATIC</div>
      </div>
      <input
        className="text-sm w-1/4 appearance-none border-none bg-[#261840] text-[#DCCBF2]"
        type="text"
        placeholder="Enter amount"
      />
    </div>
  );
};

export default SendAmount;
