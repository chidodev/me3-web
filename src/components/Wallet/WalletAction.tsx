import React, { useMemo } from "react";
import { RiArrowUpDownFill } from "react-icons/ri";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import cl from "clsx";

import { useAuth } from "@/helpers/context/authContext";

import { ActiveLink } from "../UI/ActiveLink";
import { ReactIcon } from "../UI/ReactIcon";

import type { Variants } from "framer-motion";

const animationVariant: Variants = {
  whileHover: { backgroundColor: "rgb(121 56 197)", transition: { duration: 0.2 } },
  whileTap: { scale: 0.94, originX: 0, transition: { duration: 0.2 } },
};

export function WalletAction(): JSX.Element {
  const { user } = useAuth();

  const userHasBalance: boolean = useMemo(() => {
    if (user) {
      // TODO: uncomment this line when the backend is ready
      // return user.balance;
      return false;
    }
    return false;
  }, [user]);

  return (
    <div className="flex flex-wrap gap-3 text-heading-small font-bold">
      <ActiveLink
        className="flex items-center gap-x-3 rounded-[4px] bg-primary-60 px-5 py-4"
        animationVariant={animationVariant}
        href=""
      >
        <>
          <ReactIcon iconType={FiArrowDown}></ReactIcon>
          <div>Deposit</div>
        </>
      </ActiveLink>

      <div className={cl(userHasBalance ? "cursor-pointer" : "cursor-not-allowed")}>
        <ActiveLink
          className={cl(
            "flex items-center gap-x-3 rounded-[4px] px-5 py-4",
            userHasBalance ? "bg-primary-60" : " pointer-events-none bg-neutral-80",
          )}
          animationVariant={animationVariant}
          href="/swap"
        >
          <>
            <ReactIcon iconType={RiArrowUpDownFill}></ReactIcon>
            <div>Swap</div>
          </>
        </ActiveLink>
      </div>

      <div className={cl(userHasBalance ? "cursor-pointer" : "cursor-not-allowed")}>
        <ActiveLink
          className={cl(
            "flex items-center gap-x-3 rounded-[4px] px-5 py-4",
            userHasBalance ? "bg-primary-60" : " pointer-events-none bg-neutral-80",
          )}
          animationVariant={animationVariant}
          href="/send"
        >
          <>
            <ReactIcon iconType={FiArrowUpRight}></ReactIcon>
            <div>Send</div>
          </>
        </ActiveLink>
      </div>
    </div>
  );
}
