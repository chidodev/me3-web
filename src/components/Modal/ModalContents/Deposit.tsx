import { FramerButton } from "@/components/UI/FramerButton";
import { NextImage } from "@/components/UI/NextImage";

type WalletReadyProps = {
  closeModal: () => void;
};

export function WalletReady({ closeModal }: WalletReadyProps): JSX.Element {
  return (
    <>
      <div className="main-border flex max-w-[535px] flex-col gap-6 bg-neutral-black py-11">
        <div className="mx-32">
          <NextImage alt="Login Poster Image" src="/pop.svg" height={278} width={278} />
        </div>
        <div className="mx-20 flex flex-col gap-4 text-center">
          <h1 className="text-display-small font-bold text-neutral-white">Your Me3 wallet is ready!</h1>
          <p className="text-base-large text-primary-20">
            Use your wallet to buy, earn, store, and swap cryptocurrency, in-game tokens and NFTs.
          </p>
        </div>
        <div className="flex justify-center">
          <FramerButton
            className=" bg-primary-60 py-3 px-28 text-heading-small font-bold text-neutral-white"
            onClick={closeModal}
          >
            Continue
          </FramerButton>
        </div>
      </div>
    </>
  );
}
