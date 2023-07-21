import { forwardRef } from "react";
import { motion } from "framer-motion";
import cn from "clsx";

import type { Variants } from "framer-motion";

const defaultAnimation = (isDisabled: boolean | undefined): Variants => ({
  whileHover: isDisabled ? {} : { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } },
  whileTap: isDisabled ? {} : { scale: 0.95 },
});

type FramerButtonProps = React.ComponentPropsWithRef<typeof motion.button> & {
  animationVariant?: Variants;
  loading?: boolean;
};

export const FramerButton = forwardRef<HTMLButtonElement, FramerButtonProps>((props, ref) => {
  const { className, animationVariant, loading, disabled, children, ...rest } = props;
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const isDisabled = loading || disabled;

  return (
    <motion.button
      type="button"
      disabled={isDisabled}
      className={cn("main-tab", loading && "relative !text-transparent disabled:cursor-wait", className)}
      ref={ref}
      {...(animationVariant ? { ...animationVariant } : { ...defaultAnimation(isDisabled) })}
      {...rest}
    >
      {children}
    </motion.button>
  );
});

FramerButton.displayName = "FramerButton";
