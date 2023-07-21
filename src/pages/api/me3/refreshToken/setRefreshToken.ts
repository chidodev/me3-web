/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { REFRESH_TOKEN_COOKIE } from "@/constants/cookie";
import { setCookie } from "@/helpers/cookieHelper";

import type { DynamicObject } from "@/models/DynamicObjectModel";
import type { GenericResponse } from "@/models/ResponseModel";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<GenericResponse<DynamicObject>>): void {
  // only allow post
  if (req.method !== "POST") {
    return res.status(405).json({ code: "405", msg: "Method Not Allowed", data: {} });
  }

  const { refreshToken } = req.body;

  if (refreshToken === undefined) {
    return res.status(400).json({ code: "400", msg: "Invalid Refresh Token", data: {} });
  }

  setCookie(REFRESH_TOKEN_COOKIE, refreshToken as string, { req, res });

  // Successful cookie set
  return res.status(200).json({ code: "200", msg: "OK", data: {} });
}
