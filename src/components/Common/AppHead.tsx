import Head from "next/head";

export function AppHead(): JSX.Element {
  return (
    <Head>
      <title>Me3</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/ME3_logo.svg" />
      <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      {/* Add seo related meta tags here */}
    </Head>
  );
}
