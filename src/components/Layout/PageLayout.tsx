import { Placeholder } from "@/components/Common/Placeholder";
import { useRequireAuth } from "@/helpers/hooks/useRequireAuth";

import type { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

export function ProtectedLayout({ children }: LayoutProps): JSX.Element {
  const { user, isLoading } = useRequireAuth();

  if (!user || isLoading) return <Placeholder />;

  return <>{children}</>;
}

export function HomeLayout({ children }: LayoutProps): JSX.Element {
  return <>{children}</>;
}
