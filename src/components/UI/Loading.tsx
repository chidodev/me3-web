import cn from "clsx";
import { AiOutlineLoading } from "react-icons/ai";

import { ReactIcon } from "./ReactIcon";

type LoadingProps = {
  className?: string;
  iconClassName?: string;
};

export function Loading({ className, iconClassName }: LoadingProps): JSX.Element {
  return (
    <i className={cn("flex justify-center", className ?? "p-4")}>
      <ReactIcon className={cn("text-main-accent", iconClassName ?? "h-7 w-7")} iconType={AiOutlineLoading} />
    </i>
  );
}
