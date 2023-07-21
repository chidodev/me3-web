import Image from "next/image";
import React from "react";

const Card = () => {
  return (
    <div className="flex flex-row items-center justify-between border-b border-slate-700 p-2 px-3">
      <div className="flex flex-row items-center space-x-2">
        <Image src="/PolyIcon.svg" alt="PolyIcon" height={25} width={25} />
        <div className="text-lg">Matic</div>
        <div className="text-xs">Polygon</div>
      </div>
      <div className="flex flex-col">
        <div className="TokenAmt">672.354</div>
        <div className="DollarAmt text-xs">$578.20</div>
      </div>
    </div>
  );
};

export default Card;
