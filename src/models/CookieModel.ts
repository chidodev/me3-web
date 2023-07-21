import type { IncomingMessage, ServerResponse } from "http";
import type { CookieSerializeOptions } from "cookie";

export type OptionsType = CookieSerializeOptions & {
  res?: ServerResponse;
  req?: IncomingMessage & {
    cookies?: Record<string, string> | Partial<Record<string, string>>;
  };
};

export type CookiesValueTypes = Record<string, string> | Partial<Record<string, string>>;
export type CookieValueTypes = string | boolean | undefined | null;
