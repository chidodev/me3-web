import React from "react";

const SendTabs = () => {
  return (
    <div className="mt-4 flex flex-row space-x-5 pb-1 ">
      <div className="flex cursor-pointer justify-center border-b px-3 pb-3 font-semibold">Tokens</div>
      <div className="flex cursor-pointer justify-center font-semibold">NFTs</div>
    </div>
  );
};

export default SendTabs;
