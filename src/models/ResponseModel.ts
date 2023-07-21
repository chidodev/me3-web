import type { Wallet } from "./WalletModel";
import type { RefreshTokenResponse } from "./RefreshTokenResponseModel";
import type { UserInfoResponse } from "./UserModel";
import type { Tokens } from "@me3technology/keysmith/dist/types";

export type GenericResponse<T> = {
  code: string;
  msg: string;
  data: T;
};

export type GetAuthResponse = {
  tokenInfo: Tokens;
  userInfoResponse: UserInfoResponse;
  userWalletsResponse: Wallet[];
};

export type GetRefreshResponse = {
  tokenInfo: RefreshTokenResponse;
  userInfoResponse: UserInfoResponse;
  userWalletsResponse: Wallet[];
};
