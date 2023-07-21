import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../context/authContext";
import { sleep } from "../utils";

import { useGlobalLoading } from "./useGlobalLoading";

import type { User } from "@/models/UserModel";

type RequireAuthReturnType = {
  user: User | null;
  isLoading: boolean;
};

export function useRequireAuth(redirectUrl?: string): RequireAuthReturnType {
  const { replace } = useRouter();
  const { isGlobalLoading, disableGlobalLoading } = useGlobalLoading();
  const { authContextInitiated, user } = useAuth();

  useEffect(() => {
    if (authContextInitiated && user) {
      void sleep(1000, () => {
        disableGlobalLoading();
      });
    } else if (authContextInitiated && !user) {
      toast.error("You must be logged in to view this page.", { id: "loginError", duration: 6000 });
      void replace(redirectUrl ?? "/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContextInitiated]);

  return {
    user, //user is null if not logged in
    isLoading: isGlobalLoading,
  };
}
