import React from "react";
import { FaRegCopy, FaGooglePlay } from "react-icons/fa";
import toast from "react-hot-toast";

import { useAuth } from "@/helpers/context/authContext";
import { truncateEthAddress } from "@/helpers/utils";

import { FramerButton } from "../UI/FramerButton";
import { ReactIcon } from "../UI/ReactIcon";

import type { Variants } from "framer-motion";

export function Wallet(): JSX.Element {
  const { user } = useAuth();

  const copyBoxAnimation: Variants = {
    whileHover: { backgroundColor: "rgba(153, 87, 229)" },
    whileTap: { scale: 0.9 },
  };

  const copyAddress = async (): Promise<void> => {
    if (user?.currentlySelectedWallet) {
      await navigator.clipboard.writeText(user?.currentlySelectedWallet.walletAddress);
      toast.success("Copied wallet address to clipboard", {
        id: "copyAddress",
      });

      //Warning example toast
      // toast(
      //   (t) => (
      //     <div className="flex items-center gap-x-2">
      //       <ReactIcon className="h-5 w-5" iconType={RiAlertFill} />
      //       <span>This is an alert</span>
      //     </div>
      //   ),
      //   {
      //     style: {
      //       backgroundColor: "rgb(36, 28, 51)",
      //       color: "rgb(var(--primary-20))",
      //       borderColor: "rgb(var(--primary-20))",
      //     },
      //   },
      // );
    }
  };

  return (
    <div className="main-border rounded-2xl border-2 bg-main-background">
      <div className="block space-y-4 p-7 text-primary-20">
        <div className="flex flex-wrap gap-3">
          <FramerButton
            className="flex items-center gap-x-2 rounded-[44px] bg-neutral-white/5 px-5 py-3"
            animationVariant={copyBoxAnimation}
            onClick={copyAddress}
          >
            <span>
              {(user?.currentlySelectedWallet && truncateEthAddress(user?.currentlySelectedWallet.walletAddress)) ?? ""}
            </span>
            <span>
              <ReactIcon className="h-5 w-5" iconType={FaRegCopy} />
            </span>
          </FramerButton>
          <FramerButton
            className="flex items-center gap-x-1 rounded-lg border-[1px] border-dark-border bg-neutral-white/5 py-3 px-5 text-neutral-white xm:ml-auto"
            animationVariant={copyBoxAnimation}
          >
            <span>
              <ReactIcon className="h-5 w-5" iconType={FaGooglePlay} />
            </span>
            <span>Download App</span>
          </FramerButton>
        </div>

        <div className="text-display-medium">$0.00</div>
      </div>
    </div>
  );
}
