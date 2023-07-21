import "@/styles/globals.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";

import { AppHead } from "@/components/Common/AppHead";
import { ThemeContextProvider } from "@/helpers/context/themeContext";
import { AuthContextProvider } from "@/helpers/context/authContext";
import { RootLayout } from "@/components/Layout/RootLayout";
import { ReactIcon } from "@/components/UI/ReactIcon";

import type { DefaultToastOptions } from "react-hot-toast";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppPropsWithLayout): ReactNode => {
  const getLayout = Component.getLayout ?? ((page): ReactNode => page);

  const toastOptions: DefaultToastOptions = {
    style: {
      borderRadius: "4px",
      borderWidth: "1px",
    },
    success: {
      style: {
        color: "rgb(var(--success-50))",
        backgroundColor: "rgb(46, 58, 65)",
        borderColor: "rgb(var(--success-50))",
      },
      icon: <ReactIcon className="h-5 w-5" iconType={BsCheckCircleFill} />,
    },
    error: {
      style: {
        color: "rgb(var(--danger-40))",
        backgroundColor: "rgb(64, 35, 52)",
        borderColor: "rgb(var(--danger-40))",
      },
      icon: <ReactIcon className="h-6 w-6" iconType={RiErrorWarningFill} />,
    },
    position: "top-right",
  };

  return (
    <>
      <AppHead />
      {/* wrap with auth and theme context */}
      <AuthContextProvider>
        <ThemeContextProvider>
          <QueryClientProvider client={queryClient}>
            <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
            <Toaster position="top-right" toastOptions={toastOptions} containerClassName="mb-12 xs:mb-0" />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
