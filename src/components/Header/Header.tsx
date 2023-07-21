import React, { useEffect, useMemo, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { When } from "react-if";

import { SUPPORTED_NETWORKS } from "@/constants/common";
import { useAuth } from "@/helpers/context/authContext";
import { useSidebar } from "@/helpers/hooks/useSidebar";

import { FramerButton } from "../UI/FramerButton";
import { ReactIcon } from "../UI/ReactIcon";
import { NextImage } from "../UI/NextImage";
import { ActiveLink } from "../UI/ActiveLink";
import ListboxSelect from "../UI/Floating/ListboxSelect";

import { HeaderSettings } from "./HeaderSettings";

import type { ChainNetwork } from "@/models/ChainNetworkModel";

export function Header(): JSX.Element {
  const { user, setCurrentlySelectedWallet } = useAuth();
  const { enableSidebar } = useSidebar();

  const defaultSelectedNetwork = useMemo(
    () =>
      SUPPORTED_NETWORKS.find((network) => network.chainName === user?.currentlySelectedWallet?.chainName) ??
      SUPPORTED_NETWORKS[0],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [selectedNetwork, setSelectedNetwork] = useState<ChainNetwork>(defaultSelectedNetwork);

  useEffect(() => {
    if (user) {
      const wallet = user.wallets.find((wallet) => wallet.chainName === selectedNetwork.chainName);
      if (wallet) {
        setCurrentlySelectedWallet(wallet);
        user.currentlySelectedWallet = wallet;
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNetwork]);

  return (
    <div className="flex h-20 items-center justify-between bg-transparent px-10">
      <NextImage className="mr-3 shrink-0" src="/ME3_logo.svg" alt="ME3 logo" width={150} height={200} />

      {user && (
        <nav className="flex items-center space-x-20">
          <ActiveLink
            className="hidden md:block"
            href="/dashboard"
            activeClassName="active-link"
            inactiveClassName="text-main-accent"
          >
            <div>Wallet</div>
          </ActiveLink>
          <ActiveLink
            className="hidden md:block"
            href="/history"
            activeClassName="active-link"
            inactiveClassName="text-main-accent"
          >
            <div>History</div>
          </ActiveLink>
        </nav>
      )}

      <When condition={!!user}>
        <div className="flex items-center gap-2">
          <ListboxSelect
            options={SUPPORTED_NETWORKS}
            selected={selectedNetwork}
            onChange={(option): void => {
              const selectedWallet = SUPPORTED_NETWORKS.find((network) => network.id === option.id);
              setSelectedNetwork(selectedWallet ?? SUPPORTED_NETWORKS[0]);
            }}
          />

          <HeaderSettings />
          <FramerButton
            className="ml-5 shrink-0 md:ml-0 md:hidden"
            onClick={(): void => {
              enableSidebar();
            }}
          >
            <ReactIcon
              className="h-6 w-6
            "
              iconType={GiHamburgerMenu}
            />
          </FramerButton>
        </div>
      </When>
    </div>
  );
}
