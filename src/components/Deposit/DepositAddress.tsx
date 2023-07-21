import React from "react";
import copy from "copy-to-clipboard";

const DepositAddress = () => {
  function copyText() {
    copy("0x66A5EB8170Cc8d525ce7fe4De27141C428041788");
  }

  return (
    <div className="flex w-full flex-row justify-between rounded-lg border-2 border-[#3E364D] p-2">
      <div className="flex flex-col">
        <div className="text-xs text-[#BB8CF2]">Wallet Address</div>
        <div className="text-sm">0x66A5EB8170Cc8d525ce7fe4De27141C428041788</div>
      </div>
      <div
        className="flex cursor-pointer items-center justify-center rounded-lg bg-[#291B45] pl-2 pr-2"
        onClick={() => copyText()}
      >
        <div className="text-xs text-[#BB8CF2]">Copy address</div>
      </div>
    </div>
  );
};

export default DepositAddress;
