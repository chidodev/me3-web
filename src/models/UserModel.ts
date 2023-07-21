import type { Wallet } from "./WalletModel";
import type { Accent, Theme } from "./ThemeModel";

export type UserInfoResponse = {
  uid: string;
  email: string;
  name: string;
  partnerId: string;
  krFileId: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  partnerId: string;
  theme: Theme;
  accent: Accent;
  wallets: Wallet[];
  currentlySelectedWallet: Wallet | null;
};
