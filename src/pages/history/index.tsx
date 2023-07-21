import React from "react";

import HistoryCards from "@/components/History/HistoryCards";
import HistoryTitle from "@/components/History/HistoryTitle";
import { ProtectedLayout } from "@/components/Layout/PageLayout";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Header } from "@/components/Header/Header";
import { SEO } from "@/components/Common/SEO";

import type { ReactElement, ReactNode } from "react";

export default function History(): JSX.Element {
  return (
    <div className="grid min-h-screen w-full grid-rows-[auto,_1fr,_auto]">
      <SEO title="Wallet History" />
      <Header />
      <main className="flex max-w-[684px] flex-col justify-start">
        <div className="mx-5 px-5 py-10">
          <HistoryTitle />
          <div className="flex w-full flex-col">
            <HistoryCards />
          </div>
        </div>
      </main>
    </div>
  );
}

History.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <AppLayout> {page} </AppLayout>
  </ProtectedLayout>
);
