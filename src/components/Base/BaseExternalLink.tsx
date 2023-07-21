import { sanitizeUrl } from "@braintree/sanitize-url";
import cn from "clsx";

import type { ReactElement } from "react";

type BaseExternalLinkProps = {
  link: string;
  disabled?: boolean;
  children: ReactElement;
};

export function BaseExternalLink(props: BaseExternalLinkProps): ReactElement {
  const { link, disabled, children } = props;

  return (
    <a
      className={cn("whitespace-nowrap", disabled && ["pointer-events-none"])}
      href={sanitizeUrl(link)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
