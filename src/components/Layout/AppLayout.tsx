import { WindowContextProvider } from "@/helpers/context/windowContext";

import type { LayoutProps } from "./PageLayout";

//Add optional left content area, right content area, bottom content area

export function AppLayout({ children }: LayoutProps): JSX.Element {
  return (
    <WindowContextProvider>
      <div className="relative flex w-full justify-center gap-0 lg:gap-4">
        {/* <LeftContentArea /> */}
        {children}
        {/* <RightContentArea /> */}
      </div>
    </WindowContextProvider>
  );
}
