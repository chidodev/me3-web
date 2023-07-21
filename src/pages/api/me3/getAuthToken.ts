/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { omit, pick } from "lodash-es";

import { Me3Instance } from "@/services/me3";
import { getCookie, hasCookie } from "@/helpers/cookieHelper";
import { PRI_RSA_COOKIE } from "@/constants/cookie";

import type { Wallet } from "@/models/WalletModel";
import type { UserInfoResponse } from "@/models/UserModel";
import type { Tokens } from "@me3technology/keysmith/dist/types";
import type { GenericResponse, GetAuthResponse } from "@/models/ResponseModel";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenericResponse<GetAuthResponse | {}>>,
): Promise<void> {
  const { code, state, sessionState } = req.body;
  let tokens: Tokens | null = null;

  if (!code || !state || !sessionState || !hasCookie(PRI_RSA_COOKIE, { req })) {
    return res.status(401).json({ code: "401", msg: "Unauthorized", data: {} });
  }

  const priRSACookie = getCookie(PRI_RSA_COOKIE, { req });

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    tokens = await Me3Instance.getInstance().getAuthToken(code, state, sessionState, priRSACookie as string);

    const userInfoPromise = Me3Instance.getInstance().me3ApiClient().get<UserInfoResponse>("kc/api/userInfo");
    const userWalletsPromise = Me3Instance.getInstance().getWallets(tokens.google_access);

    const [{ data: userInfoResponse }, userWalletsResponse] = await Promise.all([userInfoPromise, userWalletsPromise]);

    return res.status(200).json({
      code: "200",
      msg: "OK",
      data: {
        tokenInfo: pick(tokens, ["kc_access", "kc_refresh", "google_access", "rsaPubKey"]),
        userInfoResponse,
        userWalletsResponse: userWalletsResponse.reduce<Wallet[]>((acc, wallet) => {
          return [...acc, omit(wallet, ["secret"])];
        }, []),
      },
    });
  } catch (error) {
    return res.status(401).json({ code: "401", msg: "Unauthorized", data: { error } });
  }
}
