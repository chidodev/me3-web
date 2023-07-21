import React from "react";
import Image from "next/image";

const DepositDownload = () => {
  return (
    <div className="flex flex-row space-x-2 rounded-md bg-[#9957E5] p-3">
      <Image src="/download.svg" alt="download_logo" height={20} width={20} />
      <div>Save QR code</div>
    </div>
  );
};

export default DepositDownload;
