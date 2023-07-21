import { createContext, useContext, useEffect, useState } from "react";

import type { Wallet } from "@/models/WalletModel";
import type { User } from "@/models/UserModel";
import type { Accent, Theme } from "@/models/ThemeModel";
import type { ReactNode } from "react";

type AuthContext = {
  user: User | null;
  tokens: {
    accessToken: string;
    googleAccessToken: string;
  } | null;
  signIn: (signInParams: SignInParams) => void;
  signOut: () => void;
  setUserTheme: (theme: Theme) => void;
  setUserAccent: (accent: Accent) => void;
  setCurrentlySelectedWallet: (wallet: Wallet) => void;
  authContextInitiated: boolean;
};

export const MyAuthContext = createContext<AuthContext | null>(null);

export type SignInParams = {
  user: User | null;
  accessToken: string;
  googleAccessToken: string;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<{ accessToken: string; googleAccessToken: string } | null>(null);
  const [authContextInitiated, setAuthContextInitiated] = useState(false);

  useEffect(() => {
    const cachedUser = JSON.parse(localStorage.getItem("user") ?? "null") as User | null;
    setUser(cachedUser);
  }, []);

  const signIn = (signInParams: SignInParams): void => {
    localStorage.setItem("user", JSON.stringify(signInParams.user));
    setTokens({
      accessToken: signInParams.accessToken,
      googleAccessToken: signInParams.googleAccessToken,
    });
    // Default selected network
    if (signInParams.user && !signInParams.user.currentlySelectedWallet) {
      signInParams.user.currentlySelectedWallet = signInParams.user.wallets[0];
      localStorage.setItem("user", JSON.stringify(signInParams.user));
    }
    setUser(signInParams.user);

    setAuthContextInitiated(true);
  };

  const signOut = (): void => {
    localStorage.removeItem("user");
    setUser(null);
    setTokens(null);
    setAuthContextInitiated(true);
  };

  const setUserTheme = (theme: Theme): void => {
    if (user) {
      setUser({ ...user, theme });
    }
  };

  const setUserAccent = (accent: Accent): void => {
    if (user) {
      setUser({ ...user, accent });
    }
  };

  const setCurrentlySelectedWallet = (wallet: Wallet): void => {
    if (user) {
      setUser({ ...user, currentlySelectedWallet: wallet });
    }
  };

  return (
    <MyAuthContext.Provider
      value={{
        user,
        tokens,
        signIn,
        signOut,
        setUserTheme,
        setUserAccent,
        setCurrentlySelectedWallet,
        authContextInitiated,
      }}
    >
      {children}
    </MyAuthContext.Provider>
  );
}

export function useAuth(): AuthContext {
  const context = useContext(MyAuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
}
