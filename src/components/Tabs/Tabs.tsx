import { Tab } from "@headlessui/react";
import cl from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type { DynamicVariantObject } from "@/models/FramerMotionModel";
import type { ReactElement } from "react";

// tabTitle and children have to be in the same order and length
type TabsProps = {
  tabTitles: string[];
  childrens: ReactElement[];
};

type HtmlOrNull = HTMLElement | null;

const variants: DynamicVariantObject = {
  modal: {
    initial: (direction: boolean) => {
      return { opacity: 0, x: direction ? "-100px" : "100px" };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.15, ease: "easeOut" },
    },
    exit: (direction: boolean) => {
      return { opacity: 0, x: direction ? "100px" : "-100px", transition: { duration: 0.15, ease: "easeOut" } };
    },
  },
};

export default function Tabs({ tabTitles, childrens }: TabsProps): ReactElement {
  const [[activeTabIndex, direction], setActiveTabIndex] = useState([0, false]);

  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef<HtmlOrNull[]>([]);

  useEffect(() => {
    function setTabPosition(): void {
      const currentTab = tabsRef.current[activeTabIndex];
      if (currentTab) {
        setTabUnderlineWidth(currentTab.offsetWidth);
        setTabUnderlineLeft(currentTab.offsetLeft);
      }
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  return (
    <div className="mt-5">
      <Tab.Group>
        <Tab.List className="relative flex text-neutral-white">
          {tabTitles.map((category, index) => (
            <Tab
              ref={(el): void => {
                tabsRef.current[index] = el;
              }}
              key={category}
              className={({ selected }): string =>
                cl(
                  "main-tab text-heading-small font-semibold focus-visible:ring-0",
                  selected ? "text-neutral-white" : "text-neutral-60",
                )
              }
              onClick={(): void =>
                setActiveTabIndex((prevIndex) => {
                  const newIndex = index;
                  const direction = newIndex > prevIndex[0] ? true : false;
                  return [newIndex, direction];
                })
              }
            >
              {({ selected }): ReactElement => <div className="w-min px-8 pt-6 pb-3">{category}</div>}
            </Tab>
          ))}
          <span
            className="absolute bottom-0 h-[3px] bg-neutral-white transition-all duration-300"
            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
          />
        </Tab.List>
        <Tab.Panels className="mt-2">
          <AnimatePresence mode="wait" custom={direction}>
            <Tab.Panel
              key={activeTabIndex}
              className={cl("rounded-xl p-3")}
              as={motion.div}
              {...variants.modal}
              custom={direction}
              static
            >
              {childrens[activeTabIndex]}
            </Tab.Panel>
          </AnimatePresence>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
