import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import cn from "clsx";

import type { DynamicVariantObject } from "@/models/FramerMotionModel";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";

type ModalProps = {
  open: boolean;
  children: ReactNode;
  modalAnimation?: Variants;
  modalClassName?: string;
  closePanelOnClick?: boolean;
  closeModal: () => void;
};

const variants: DynamicVariantObject = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  modal: {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", duration: 0.5, bounce: 0.4 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
  },
};

export function DefaultModal({
  open,
  children,
  modalAnimation,
  closePanelOnClick,
  closeModal,
}: ModalProps): JSX.Element {
  return (
    <AnimatePresence>
      {open && (
        <Dialog className="relative z-50" open={open} onClose={closeModal} static>
          <motion.div className="hover-animation fixed inset-0 bg-black/30" aria-hidden="true" {...variants.backdrop} />
          <div className={cn("fixed inset-0 grid place-content-center overflow-y-auto")}>
            <Dialog.Panel
              as={motion.div}
              {...(modalAnimation ?? variants.modal)}
              onClick={closePanelOnClick ? closeModal : undefined}
            >
              {children}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
