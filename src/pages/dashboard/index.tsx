import { useEffect } from "react";

import { SEO } from "@/components/Common/SEO";
import { Header } from "@/components/Header/Header";
import { ProtectedLayout } from "@/components/Layout/PageLayout";
import { AppLayout } from "@/components/Layout/AppLayout";
import FirstTab from "@/components/Tabs/FirstTab";
import SecondTab from "@/components/Tabs/SecondTab";
import Tabs from "@/components/Tabs/Tabs";
import { Wallet } from "@/components/Wallet/Wallet";
import { WalletAction } from "@/components/Wallet/WalletAction";

import type { ReactElement, ReactNode } from "react";

export default function Main(): JSX.Element {
  const categories = ["Tokens", "NFTs"];

  return (
    <div className="grid min-h-screen w-full grid-rows-[auto,_1fr,_auto]">
      <SEO title="Wallet Dashboard" />
      <Header />
      <main className="flex max-w-[684px] flex-col justify-start">
        <div className="mx-5 flex flex-col gap-y-5 px-5 py-10">
          <Wallet />
          <WalletAction />
          <Tabs
            tabTitles={categories}
            childrens={[
              <div key={categories[0]}>
                <FirstTab />
              </div>,
              <div key={categories[1]}>
                <SecondTab />
              </div>,
            ]}
          />
        </div>
      </main>
    </div>
  );
}

Main.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <AppLayout> {page} </AppLayout>
  </ProtectedLayout>
);
