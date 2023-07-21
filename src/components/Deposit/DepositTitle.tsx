import React from "react";
import { useRouter } from "next/router";

const DepositTitle = () => {
  const router = useRouter();
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div></div>
      <div className="text-lg pl-8">Recieve tokens</div>
      <div
        className="text-lg flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#180E2A]"
        onClick={() => router.push("/dashboard")}
      >
        x
      </div>
    </div>
  );
};

export default DepositTitle;
