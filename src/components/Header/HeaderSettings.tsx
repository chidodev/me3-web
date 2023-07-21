import { FcGoogle } from "react-icons/fc";
import { RiProfileFill } from "react-icons/ri";

import { useAuth } from "@/helpers/context/authContext";

import PopoverWrapper from "../UI/Floating/PopoverWrapper";
import { ReactIcon } from "../UI/ReactIcon";
import { FramerButton } from "../UI/FramerButton";

export function HeaderSettings(): JSX.Element {
  const { user, signOut } = useAuth();
  return (
    <>
      <PopoverWrapper iconType={RiProfileFill}>
        <div className="w-[300px] rounded-xl p-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h1 className="text-base-small text-white/50">Current logged into</h1>
              <div className="flex items-center gap-2 rounded-md border border-main-border p-2 text-base-medium">
                <ReactIcon
                  className="h-5 w-5 text-dark-secondary group-hover:text-main-accent group-focus-visible:text-main-accent"
                  iconType={FcGoogle}
                />
                <div>{user?.email}</div>
              </div>
            </div>

            <div className="flex justify-between px-1 py-2 font-bold">
              <div>Currency</div>
              <div>USD SELECT</div>
            </div>

            <div className="flex justify-between px-1 py-2 font-bold">
              <div>Follow us on</div>
              <div className="flex gap-1">ICON</div>
            </div>

            <FramerButton
              onClick={(): void => {
                // signOut();
              }}
            >
              <div className="mx-2 rounded-[10px] bg-[rgba(62,_54,_77,_1)] px-1 py-2 font-bold transition-colors duration-150 hover:bg-primary-80">
                Log out
              </div>
            </FramerButton>
          </div>
        </div>
      </PopoverWrapper>
    </>
  );
}
