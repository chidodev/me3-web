import { FcGoogle } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { useAuth } from "@/helpers/context/authContext";
import { nextAPIAxiosClient } from "@/helpers/axiosClient";
import { useGlobalLoading } from "@/helpers/hooks/useGlobalLoading";
import { useWalletCreatedModal } from "@/helpers/hooks/useWalletCreatedModal";

import { NextImage } from "../UI/NextImage";
import { ReactIcon } from "../UI/ReactIcon";
import { FramerButton } from "../UI/FramerButton";

import type { Wallet } from "@/models/WalletModel";
import type { UserInfoResponse } from "@/models/UserModel";
import type { RefreshTokenResponse } from "@/models/RefreshTokenResponseModel";
import type { GenericResponse, GetAuthResponse } from "@/models/ResponseModel";

type LoginMainProps = {
  url: string;
};

type SetRefreshTokenBody = {
  accessToken: string;
  googleAccessToken: string;
  refreshToken: string;
  userInfoResponse: UserInfoResponse;
  userWalletsResponse: Wallet[];
};

type AuthorizationToken = {
  code: string;
  state: string;
  sessionState: string;
};

export function Login({ url }: LoginMainProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState<AuthorizationToken | null>(null);
  const [externalWindow, setExternalWindow] = useState<Window | null>();
  const intervalRef = useRef<number>();
  const { replace } = useRouter();
  const { enableGlobalLoading } = useGlobalLoading();
  const { enableWalletCreatedModal } = useWalletCreatedModal();

  const { signIn } = useAuth();

  const { mutate: mutateAuthSession } = useMutation({
    mutationFn: (body: SetRefreshTokenBody) =>
      nextAPIAxiosClient
        .post<GenericResponse<Partial<RefreshTokenResponse>>>("/api/me3/refreshToken/setRefreshToken", body)
        .then((response) => response),
    onSuccess: (response, variables) => {
      signIn({
        user: {
          name: variables.userInfoResponse.name,
          accent: "purple",
          email: variables.userInfoResponse.email,
          partnerId: variables.userInfoResponse.partnerId,
          id: variables.userInfoResponse.uid,
          theme: "dark",
          wallets: variables.userWalletsResponse,
          currentlySelectedWallet: null,
        },
        accessToken: variables.accessToken,
        googleAccessToken: variables.googleAccessToken,
      });
      void replace("/dashboard");
      enableGlobalLoading();
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const { refetch: refetchGetAuthToken } = useQuery({
    queryKey: ["getAuthToken"],
    enabled: false,
    retry: false,
    queryFn: () =>
      nextAPIAxiosClient
        .post<GenericResponse<GetAuthResponse>>("/api/me3/getAuthToken", authToken)
        .then((response) => response),
    onSuccess: (response) => {
      enableWalletCreatedModal();
      const resultData = response.data.data;
      mutateAuthSession({
        accessToken: resultData.tokenInfo.kc_access,
        googleAccessToken: resultData.tokenInfo.google_access,
        refreshToken: resultData.tokenInfo.kc_refresh,
        userInfoResponse: resultData.userInfoResponse,
        userWalletsResponse: resultData.userWalletsResponse,
      });
    },
    onError: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    if (authToken) {
      setLoading(true);
      void refetchGetAuthToken();
    }
  }, [authToken, refetchGetAuthToken]);

  const clearTimer = (): void => {
    window.clearInterval(intervalRef.current);
  };

  const createCenteredPopUpWindow = (url: string, title: string, w: number, h: number): Window | null => {
    // Fixes dual-screen position
    // For browser compatibility, check the window.screenLeft and window.screenTop properties first.
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    // Returns the interior width of a window's content area including scrollbars, but not the window frame.
    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const externalPopup = window.open(
      url,
      title,
      `scrollbars=yes, width=${w / systemZoom}, height=${h / systemZoom}, top=${top}, left=${left}`,
    );
    setLoading(true);

    // Puts focus on the newWindow
    if (externalPopup) {
      externalPopup.focus();
    }

    return externalPopup;
  };

  const onContainerClick = (): void => {
    setExternalWindow(createCenteredPopUpWindow(url, "Sign in with Google", 500, 500));
  };

  useEffect(() => {
    if (externalWindow) {
      intervalRef.current = window.setInterval(() => {
        try {
          const currentUrl = externalWindow.location.href;
          const params = new URL(currentUrl).searchParams;
          //get code, state and session_state from url
          const code = params.get("code");
          const state = params.get("state");
          const sessionState = params.get("session_state");
          if (!code || !state || !sessionState) {
            return;
          }
          clearTimer();
          externalWindow.close();
          setAuthToken({ code, state, sessionState });
        } catch (error) {
          // ignore
        } finally {
          if (!externalWindow || externalWindow.closed) {
            setLoading(false);
            clearTimer();
          }
        }
      }, 700);
    }

    return (): void => {
      // cleanup just in case
      clearTimer();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalWindow]);

  return (
    <>
      <main className="flex max-w-[684px] flex-col justify-center">
        <div className="main-border mx-5 flex flex-col items-center bg-main-background px-5 py-16 shadow-standard">
          <NextImage className="mb-6" alt="Login Poster Image" src="/pop.svg" height={300} width={300} />
          <div className="flex flex-col items-center space-y-3">
            <p className="text-heading-medium font-semibold text-neutral-60">Our wallet needed everywhere</p>
            <p className="text-heading-large font-semibold text-neutral-200">
              Sign in to create or retrieve your wallet
            </p>

            <FramerButton
              disabled={loading || !url}
              className="group relative flex flex-row items-center gap-x-3 bg-neutral-white py-3 px-10 text-heading-small font-bold text-neutral-80"
              onClick={(): void => {
                onContainerClick();
              }}
            >
              <ReactIcon
                className="h-5 w-5 text-dark-secondary group-hover:text-main-accent group-focus-visible:text-main-accent"
                iconType={FcGoogle}
              />
              Sign in with Google
            </FramerButton>
          </div>
          <div className="mt-10 font-semibold text-primary-20">
            By continuing, you agree to Me3&apos;s <span className="cursor-pointer underline">Terms of Use</span> and{" "}
            <span className="cursor-pointer underline">Privacy Policy</span>.
          </div>
        </div>
      </main>
    </>
  );
}
