import { TfiLayoutPlaceholder } from "react-icons/tfi";

import type { IconBase, IconType } from "react-icons";
import type { HTMLAttributes, ReactElement } from "react";

type ReactIconProps = React.ComponentPropsWithoutRef<typeof IconBase> & {
  iconType?: IconType;
  className?: HTMLAttributes<HTMLElement>["className"];
};

export function ReactIcon(props: ReactIconProps): ReactElement {
  const { iconType, className, ...rest } = props;
  const Icon = iconType ?? TfiLayoutPlaceholder;

  return <Icon className={className ?? "h-4 w-4"} {...rest} />;
}
