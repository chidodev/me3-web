import React from "react";

import { NextImage } from "../UI/NextImage";

export default function SecondTab(): JSX.Element {
  return (
    <div className="flex flex-col place-items-center p-20 text-center text-base-large text-primary-20">
      <NextImage src="/wallet-icon.svg" alt="Empty" height={120} width={120} />
      <p>There is nothing here yet!</p>
      <p>Deposit tokens into your wallet to start using it.</p>
    </div>
  );
}
