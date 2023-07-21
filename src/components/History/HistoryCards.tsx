import React from "react";

import HistoryCard from "./HistoryCard";

const HistoryCards = () => {
  return (
    <div className="mt-5 flex w-full flex-col space-y-3">
      <div className="text-sm">25 August 2022</div>
      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
    </div>
  );
};

export default HistoryCards;
