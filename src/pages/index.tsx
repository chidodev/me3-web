import { useEffect } from "react";
import { toast } from "react-hot-toast";

import { SEO } from "@/components/Common/SEO";
import { Header } from "@/components/Header/Header";
import { AuthLayout } from "@/components/Layout/AuthLayout";
import { Login } from "@/components/Login/Login";
import { PRI_RSA_COOKIE, REFRESH_TOKEN_COOKIE } from "@/constants/cookie";
import { hasCookie, setCookie } from "@/helpers/cookieHelper";
import { siteDescription, siteName } from "@/helpers/env";
import { Me3Instance } from "@/services/me3/index";

import type { ReactElement, ReactNode } from "react";
import type { GetServerSideProps } from "next";

type PageProps = {
  url: string;
};

export default function Home({ url }: PageProps): JSX.Element {
  useEffect(() => {
    if (!url) {
      toast.error("Unable to connect to the server. Please try again later.", { id: "loginError", duration: 6000 });
    }
  }, [url]);
  return (
    <div className="grid min-h-screen grid-rows-[auto,_1fr,_auto]">
      <SEO title={siteName} description={siteDescription} />
      <Header />
      <Login url={url}></Login>
    </div>
  );
}

// Server side props is always async
// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps<PageProps> = async ({ req, res }) => {
  let url = "";
  try {
    const { data, myPriRsa } = await Me3Instance.getInstance().getAuthLink(process.env.KEYSMITH_REDIRECT_URI ?? "");
    url = data;
    if (!hasCookie(REFRESH_TOKEN_COOKIE, { req })) {
      setCookie(PRI_RSA_COOKIE, myPriRsa, { req, res });
    }
  } catch (e) {
    // console.log(e);
  }
  return {
    props: { url },
  };
};

Home.getLayout = (page: ReactElement): ReactNode => <AuthLayout>{page}</AuthLayout>;
