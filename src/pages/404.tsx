import Error from "next/error";

import { SEO } from "@/components/Common/SEO";
import { useTheme } from "@/helpers/context/themeContext";

export default function NotFound(): JSX.Element {
  const { theme } = useTheme();

  const isDarkMode = ["dim", "dark"].includes(theme);

  return (
    <>
      <SEO
        title="Page not found / Me3"
        description="Sorry we couldn’t find the page you were looking for."
        image="/404.png"
      />
      <Error title="Page not found / Me3" statusCode={404} withDarkMode={isDarkMode} />
    </>
  );
}
