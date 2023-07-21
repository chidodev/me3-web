import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { nextAPIAxiosClient } from "@/helpers/axiosClient";
import { useAuth } from "@/helpers/context/authContext";
import { useSidebar } from "@/helpers/hooks/useSidebar";
import { useWalletCreatedModal } from "@/helpers/hooks/useWalletCreatedModal";

import { Sidebar } from "../Sidebar/Sidebar";
import { DefaultModal } from "../Modal/WrapperModal/DefaultModal";
import { WalletReady } from "../Modal/ModalContents/WalletReady";

import type { ReactNode } from "react";
import type { GenericResponse, GetRefreshResponse } from "@/models/ResponseModel";

export type RootLayoutProps = {
  children: ReactNode;
};

export function RootLayout({ children }: RootLayoutProps): JSX.Element {
  const { signIn, signOut } = useAuth();
  const { isSidebarOpen, disableSidebar } = useSidebar();
  const { isWalletCreatedModalOpen, disableWalletCreatedModal } = useWalletCreatedModal();

  const { refetch } = useQuery({
    queryKey: ["refreshToken"],
    enabled: false,
    retry: false,
    queryFn: () =>
      nextAPIAxiosClient
        .post<GenericResponse<GetRefreshResponse>>("/api/me3/refreshToken/getRefreshToken")
        .then((response) => response),
    onSuccess: (response) => {
      const resultData = response.data.data;
      signIn({
        user: {
          name: resultData.userInfoResponse.name,
          accent: "purple",
          email: resultData.userInfoResponse.email,
          partnerId: resultData.userInfoResponse.partnerId,
          id: resultData.userInfoResponse.uid,
          theme: "dark",
          wallets: resultData.userWalletsResponse,
          currentlySelectedWallet: null,
        },
        accessToken: resultData.tokenInfo.kc_access ?? "",
        googleAccessToken: resultData.tokenInfo.google_access ?? "",
      });
    },
    onError: () => {
      signOut();
    },
  });

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return (
    <>
      <Sidebar
        open={isSidebarOpen}
        closeModal={(): void => {
          disableSidebar();
        }}
      />
      <DefaultModal open={isWalletCreatedModalOpen} closeModal={(): void => {}}>
        <WalletReady closeModal={disableWalletCreatedModal} />
      </DefaultModal>
      {children}
    </>
  );
}
