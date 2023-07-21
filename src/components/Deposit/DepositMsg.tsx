import React from "react";
import Image from "next/image";

const DepositMsg = () => {
  return (
    <div className="flex flex-row justify-center space-x-3 rounded-md bg-[#291B45] p-2">
      <Image src="/exclamation.svg" alt="exclamation_logo" height={20} width={20} />
      <div className="flex flex-col">
        <div className="text-sm text-[#BB8CF2]">This is your polygon Wallet Address</div>
        <div className="text-xs text-[#BB8CF2]">
          Only transfer funds on Ethereum, Polygon, Avalanche C-chain and other EVM-compatible networks to this address
        </div>
      </div>
    </div>
  );
};

export default DepositMsg;
