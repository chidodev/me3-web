import { omit, pick } from "lodash-es";

import { deleteCookie, getCookie, hasCookie, setCookie } from "@/helpers/cookieHelper";
import { Me3Instance } from "@/services/me3";
import { PRI_RSA_COOKIE, REFRESH_TOKEN_COOKIE } from "@/constants/cookie";
import { validateObject } from "@/helpers/utils";

import type { Wallet } from "@/models/WalletModel";
import type { UserInfoResponse } from "@/models/UserModel";
import type { GenericResponse, GetRefreshResponse } from "@/models/ResponseModel";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenericResponse<GetRefreshResponse | {}>>,
): Promise<void> {
  // only allow post
  if (req.method !== "POST") {
    return res.status(405).json({ code: "405", msg: "Method Not Allowed", data: {} });
  }

  if (!hasCookie(REFRESH_TOKEN_COOKIE, { req, res }) || !hasCookie(PRI_RSA_COOKIE, { req, res })) {
    deleteCookie(REFRESH_TOKEN_COOKIE, { req, res });

    return res.status(401).json({ code: "401", msg: "Unauthorized", data: {} });
  }

  const refreshTokenCookie = getCookie(REFRESH_TOKEN_COOKIE, { req, res }) as string;
  const priRsaCookie = getCookie(PRI_RSA_COOKIE, { req, res }) as string;

  try {
    let refreshTokenResponse = null;
    refreshTokenResponse = await Me3Instance.getInstance().manualRefreshToken(refreshTokenCookie, priRsaCookie);

    const requiredProperties = ["kc_access", "kc_refresh", "google_access", "rsaPubKey"];

    if (!validateObject(refreshTokenResponse, requiredProperties)) {
      throw new Error("Missing required properties");
    }

    const userInfoPromise = Me3Instance.getInstance().me3ApiClient().get<UserInfoResponse>("kc/api/userInfo");
    const userWalletsPromise = Me3Instance.getInstance().getWallets(refreshTokenResponse.google_access);

    const [{ data: userInfoResponse }, userWalletsResponse] = await Promise.all([userInfoPromise, userWalletsPromise]);

    setCookie(REFRESH_TOKEN_COOKIE, refreshTokenResponse.kc_refresh ?? "", { req, res });
    setCookie(PRI_RSA_COOKIE, priRsaCookie, { req, res });

    return res.status(200).json({
      code: "200",
      msg: "OK",
      data: {
        tokenInfo: pick(refreshTokenResponse, ["google_access", "kc_access", "rsaPubKey"]),
        userInfoResponse,
        userWalletsResponse: userWalletsResponse.reduce<Wallet[]>((acc, wallet) => {
          return [...acc, omit(wallet, ["secret"])];
        }, []),
      },
    });
  } catch (error) {
    deleteCookie(REFRESH_TOKEN_COOKIE, { req, res });
    return res.status(401).json({ code: "401", msg: "Unauthorized", data: {} });
  }
}
