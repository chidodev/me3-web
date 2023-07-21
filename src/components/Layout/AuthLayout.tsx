import _ from "lodash-es";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { useGlobalLoading } from "@/helpers/hooks/useGlobalLoading";
import { useAuth } from "@/helpers/context/authContext";
import { sleep } from "@/helpers/utils";

import { Placeholder } from "../Common/Placeholder";

import type { LayoutProps } from "./PageLayout";

export function AuthLayout({ children }: LayoutProps): JSX.Element {
  const { replace } = useRouter();
  const { isGlobalLoading, disableGlobalLoading } = useGlobalLoading();
  const { authContextInitiated, user } = useAuth();

  const redirectPageThrottled = useRef(
    _.throttle(async () => {
      await replace("/dashboard");
    }, 5000),
  );

  useEffect(() => {
    if (authContextInitiated && user) {
      void redirectPageThrottled.current();
    } else if (authContextInitiated && !user) {
      void sleep(1000, () => {
        disableGlobalLoading();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContextInitiated]);

  if (isGlobalLoading) return <Placeholder />;

  return <>{children}</>;
}
