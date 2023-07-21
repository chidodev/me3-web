import React from "react";
import QRCode from "qrcode.react";

import DepositAddress from "@/components/Deposit/DepositAddress";
import DepositDownload from "@/components/Deposit/DepositDownload";
import DepositMsg from "@/components/Deposit/DepositMsg";
import DepositTitle from "@/components/Deposit/DepositTitle";
// import QRCode from "react-qr-code"

const Deposit = () => {
  return (
    <div className="flex h-screen flex-col items-center  bg-[#10081E]">
      <div className="mt-5 flex h-3/5 w-1/3 flex-col items-center space-y-4 rounded-xl">
        <DepositTitle />
        <DepositMsg />
        <QRCode value="0x66A5EB8170Cc8d525ce7fe4De27141C428041788" renderAs="canvas" level="L" size={200} />
        <DepositDownload />
        <DepositAddress />
      </div>
    </div>
  );
};

export default Deposit;
