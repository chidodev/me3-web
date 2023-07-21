import { NextImage } from "../UI/NextImage";

import { SEO } from "./SEO";

export function Placeholder(): JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SEO
        title="Loading"
        description="Me3 wallet is a decentralized, non-custodial, and open-source wallet for the Ethereum blockchain."
        image="/ME3_logo.svg"
      />
      <i>
        {/* <ReactIcon className="h-20 w-20 text-[#1DA1F2]" iconType={TfiLayoutPlaceholder} /> */}
        <NextImage className="animate-bounce" src="/ME3_logo.svg" alt="Me3" width={150} height={150} />
      </i>
    </main>
  );
}
