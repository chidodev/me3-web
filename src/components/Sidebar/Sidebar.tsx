import { SidebarModal } from "../Modal/WrapperModal/SidebarModal";
import { ActiveLink } from "../UI/ActiveLink";

type SidebarProps = {
  open: boolean;
  closeModal: () => void;
};

export function Sidebar({ open, closeModal }: SidebarProps): JSX.Element {
  return (
    <div className="absolute">
      <SidebarModal
        modalClassName="bg-main-sidebar-background min-w-[336px] h-full rounded-r-xl py-7"
        open={open}
        closeModal={closeModal}
      >
        <header className="mb-10 px-5">
          <h1 className="text-heading-large">Navigation</h1>
        </header>
        <nav className="flex flex-col">
          <ActiveLink
            className="px-3 py-5"
            href="/dashboard"
            activeClassName="active-link bg-main-accent/30"
            inactiveClassName="text-main-accent"
          >
            <div className="text-base-large">Wallet</div>
          </ActiveLink>
          <ActiveLink
            className="px-3 py-5"
            href="/history"
            activeClassName="active-link bg-main-accent/30"
            inactiveClassName="text-main-accent"
          >
            <div className="text-base-large">History</div>
          </ActiveLink>
        </nav>
      </SidebarModal>
    </div>
  );
}
