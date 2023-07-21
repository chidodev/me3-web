import { AiOutlineCheck } from "react-icons/ai";
import { Listbox } from "@headlessui/react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import cn from "clsx";

import { ReactIcon } from "../ReactIcon";
import { NextImage } from "../NextImage";

import HighOrderFloat from "./HighOrderFloat";

import type { DynamicVariantObject } from "@/models/FramerMotionModel";
import type { ReactElement } from "react";

const variants: DynamicVariantObject = {
  btnVariants: {
    close: {
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    open: {
      backgroundColor: "rgba(153, 87, 229, 0.3)",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  },
  btnArrowVariants: {
    close: {
      rotate: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    open: {
      rotate: -180,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  },
};

type Option = {
  id: string;
  displayName: string;
};

type ListboxSelectProps = {
  title?: string;
  options: Option[];
  selected: Option;
  onChange: (value: Option) => void;
};

export default function ListboxSelect({ title, options, selected, onChange }: ListboxSelectProps): ReactElement {
  return (
    <div className="w-[180px]">
      <Listbox value={selected} onChange={onChange} by="id">
        {({ open }): ReactElement => (
          <>
            <Listbox.Label className="mb-1 text-heading-medium uppercase">{title}</Listbox.Label>
            <HighOrderFloat offset={1} placement="bottom-end">
              <Listbox.Button
                as={motion.button}
                variants={variants.btnVariants}
                animate={open ? "open" : "close"}
                className="flex w-full select-none items-center gap-2 rounded-full bg-primary-20/10 p-3 text-left text-heading-small font-semibold text-neutral-white"
              >
                <NextImage alt="" src="/PolyIcon.svg" width={28} height={28} />
                <span className="truncate capitalize">{selected.displayName}</span>
                <span className="pointer-events-none ml-auto flex items-center pr-2">
                  <motion.span variants={variants.btnArrowVariants} animate={open ? "open" : "close"}>
                    <ReactIcon iconType={IoIosArrowDown} className="h-5 w-5"></ReactIcon>
                  </motion.span>
                </span>
              </Listbox.Button>

              <Listbox.Options className="custom-scrollbar mt-1 max-h-[342px] w-[259px] overflow-auto rounded-xl bg-primary-20/5 text-heading-small text-neutral-white">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }): string => cn("cursor-pointer select-none", active && "bg-primary-20/20")}
                    value={option}
                  >
                    {({ selected }): ReactElement => (
                      <div className="mx-3 flex items-center gap-x-3 py-3 px-2">
                        <NextImage alt="" src="/PolyIcon.svg" width={28} height={28} />
                        <span className={"block truncate"}>{option.displayName}</span>
                        {selected ? (
                          <span className="inset-y-0 right-5 ml-auto flex items-center text-neutral-white">
                            <ReactIcon iconType={AiOutlineCheck} className="h-5 w-5"></ReactIcon>
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </HighOrderFloat>
          </>
        )}
      </Listbox>
    </div>
  );
}
