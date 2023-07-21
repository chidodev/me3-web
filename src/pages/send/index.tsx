import React from "react";

import SendTitle from "@/components/Send/SendTitle";
import SendTabs from "@/components/Send/SendTabs";
import SendAddress from "@/components/Send/SendAddress";
import SendAmount from "@/components/Send/SendAmount";
import SendButton from "@/components/Send/SendButton";

const Send = () => {
  return (
    <div className="flex h-screen flex-col items-center  bg-[#10081E]">
      <div className="mt-3 flex h-3/5 w-1/3 flex-col space-y-3 rounded-xl">
        <SendTitle />
        <SendTabs />
        <SendAddress />
        <SendAmount />
        <SendButton />
      </div>
    </div>
  );
};

export default Send;
