import { Popover } from "@headlessui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { motion } from "framer-motion";

import { ReactIcon } from "../ReactIcon";

import HighOrderFloat from "./HighOrderFloat";

import type { IconType } from "react-icons";
import type { Variants } from "framer-motion";
import type { ReactElement, ReactNode } from "react";

const defaultAnimation = (isDisabled: boolean | undefined): Variants => ({
  whileHover: isDisabled ? {} : { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } },
  whileTap: isDisabled ? {} : { scale: 0.95 },
});

type PopoverWrapperProps = {
  iconType?: IconType;
  animationVariant?: Variants;
  children?: ReactNode;
};

export default function PopoverWrapper(props: PopoverWrapperProps): ReactElement {
  const { iconType, animationVariant, children } = props;

  const Icon = iconType ?? BiDotsHorizontalRounded;
  return (
    <Popover>
      {(): ReactElement => (
        <>
          <HighOrderFloat offset={15} placement="bottom-end">
            <Popover.Button
              as={motion.button}
              className='relative flex select-none items-center rounded-full bg-transparent text-primary-40 hover:border-neutral-70 [&[data-headlessui-state="open"]]:text-secondary-40 [&[data-headlessui-state="open"]]:shadow-standard'
              {...(animationVariant ? { ...animationVariant } : { ...defaultAnimation(false) })}
            >
              <ReactIcon className="h-8 w-8" iconType={Icon}></ReactIcon>
            </Popover.Button>

            <Popover.Panel className="w-fit bg-main-background">{children ?? null}</Popover.Panel>
          </HighOrderFloat>
        </>
      )}
    </Popover>
  );
}
