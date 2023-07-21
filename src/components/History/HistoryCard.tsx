import { NextImage } from "../UI/NextImage";

const HistoryCard = () => {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg bg-[#180E2A] p-2">
      <div className="flex flex-row space-x-5">
        <NextImage src="/Recieve.png" alt="Recieve_logo" height={10} width={40} />
        <div className="flex flex-col space-y-1">
          <div className="flex flex-row items-center space-x-2">
            <div className="text-sm">Recieve</div>
            <div className=" text-xs flex flex-row items-center space-x-1 rounded-lg bg-[#2AC471] bg-opacity-20 p-0.5">
              <NextImage src="/greendot.svg" alt="greendot_logo" height={5} width={5} />
              <div className="text-[#2AC471]">Successful</div>
            </div>
          </div>
          <div className="text-xs text-[#7A728A]">From 0xq3e23r24r....</div>
        </div>
      </div>
      <div>1 ETH</div>
    </div>
  );
};

export default HistoryCard;
