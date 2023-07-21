import cl from "clsx";
import { motion } from "framer-motion";
import { Else, If, Then } from "react-if";

import type { Variants } from "framer-motion";
import type { ReactElement } from "react";

type BaseBlockProps = {
  loading?: boolean;
  customLoadingBlock?: ReactElement;
  children: ReactElement;
  loadBlockOnly?: boolean;
  className?: string;
  animationVariant?: Variants;
};

const defaultEnterAnimation: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
    },
  },
};

export function BaseBlock(props: BaseBlockProps): ReactElement {
  const { loading, customLoadingBlock, children, loadBlockOnly = false, className, animationVariant } = props;

  return (
    <div
      className={cl(
        className ? className : "border-skin-border bg-skin-block-bg text-base border-y md:rounded-xl md:border",
        loadBlockOnly && !loading && "hidden",
      )}
    >
      <If condition={loading}>
        <Then>
          <If condition={!!customLoadingBlock}>
            <Then>{customLoadingBlock}</Then>
            <Else>
              <div className="block px-4 py-4">
                <div className="lazy-loading mb-2 rounded-md" style={{ width: "80%", height: "20px" }} />
                <div className="lazy-loading rounded-md" style={{ width: "50%", height: "20px" }} />
              </div>
            </Else>
          </If>
          {customLoadingBlock}
        </Then>
        <Else>
          <motion.div {...(animationVariant ? { ...animationVariant } : { ...defaultEnterAnimation })}>
            {children}
          </motion.div>
        </Else>
      </If>
    </div>
  );
}
