import { useRouter } from "next/router";
import React, { useState, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";

import type { Variants } from "framer-motion";
import type { ReactElement } from "react";

const defaultAnimation: Variants = {
  whileHover: { scale: 1.06, originX: 0, transition: { duration: 0.2 } },
  whileTap: { scale: 0.94, originX: 0, transition: { duration: 0.2 } },
};

type ActiveLinkProps = React.ComponentPropsWithRef<typeof motion.a> & {
  children: ReactElement;
  activeClassName?: string;
  inactiveClassName?: string;
  animationVariant?: Variants;
  as?: string;
};

export const ActiveLink = forwardRef<HTMLAnchorElement, ActiveLinkProps>((props, ref) => {
  const { className: childClassName, animationVariant, activeClassName, inactiveClassName, ...rest } = props;
  const { asPath, isReady, push } = useRouter();
  const [className, setClassName] = useState(childClassName);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL((props.as ?? props.href) as string, location.href).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      const newClassName =
        linkPathname === activePathname
          ? `${childClassName ?? ""} ${activeClassName ?? ""}`.trim()
          : `${childClassName ?? ""} ${inactiveClassName ?? ""}`.trim();

      if (newClassName !== className) {
        setClassName(newClassName);
      }
    }
  }, [
    asPath,
    isReady,
    props.href,
    childClassName,
    activeClassName,
    setClassName,
    className,
    props.as,
    inactiveClassName,
  ]);

  return (
    <motion.a
      ref={ref}
      {...(animationVariant ? { ...animationVariant } : { ...defaultAnimation })}
      className={className}
      onClick={(e): void => {
        e.preventDefault();
        void push(props.href as string, props.as as string);
      }}
      {...rest}
    />
  );
});

ActiveLink.displayName = "ActiveLink";
