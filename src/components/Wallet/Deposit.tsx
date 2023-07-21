import Image from "next/image";
import React from "react";
import QRCode from "qrcode.react";

const Deposit = () => {
  return (
    <div className="flex h-screen flex-col items-center  bg-[#10081E]">
      <div className="mt-3 flex h-3/5 w-1/3 flex-col items-center space-y-3 rounded-xl">
        <div>Recieve tokens</div>
        <div className="flex flex-row justify-center space-x-3 bg-[#291B45]">
          <Image src="/exclamation.svg" alt="exclamation_logo" height={10} width={10} />
          <div className="flex flex-col">
            <div>This is your polygon Wallet Address</div>
            <div>
              Only transfer funds on Ethereum, Polygon, Avalanche C-chain and other EVM-compatible networks to this
              address
            </div>
          </div>
        </div>
        <QRCode value="" />
        <div className="flex flex-row bg-[#9957E5]">
          <Image src="/download.svg" alt="download_logo" height={10} width={10} />
          <div>Save QR code</div>
        </div>
        <div className="border-sm flex flex-row border-slate-400">
          <div className="flex flex-col">
            <div>Wallet Address</div>
            <div>0xaefsefw34r12rw4te5y5ye5y</div>
          </div>
          <div className="flex cursor-pointer items-center justify-center rounded-sm">
            <div>Copy address</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
