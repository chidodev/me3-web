// Original source: https://github.com/andreizanik/cookies-next

import { serialize, parse } from "cookie";

import type { CookieSerializeOptions } from "cookie";
import type { CookieValueTypes, OptionsType, CookiesValueTypes } from "@/models/CookieModel";

const isClientSide = (): boolean => typeof window !== "undefined";

const defaultCookieOptions: CookieSerializeOptions = {
  path: "/", // root path of the domain
  httpOnly: true, // prevent client side js from reading the cookie
  sameSite: "strict", // csrf protection
  secure: process.env.NODE_ENV === "production", // only send cookie over https in production
  maxAge: 60 * 60 * 1, // 1 hour
};

const processValue = (value: string): CookieValueTypes => {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "undefined") return undefined;
  if (value === "null") return null;
  return value;
};

const decode = (str: string): string => {
  if (!str) return str;

  return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
};

export const getCookies = (options?: OptionsType): CookiesValueTypes => {
  let req;
  if (options) req = options.req;
  if (!isClientSide()) {
    // if cookie-parser is used in project get cookies from ctx.req.cookies
    // if cookie-parser isn't used in project get cookies from ctx.req.headers.cookie
    if (req && req.cookies) return req.cookies;
    if (req && req.headers && req.headers.cookie) return parse(req.headers.cookie);
    return {};
  }

  const _cookies: CookiesValueTypes = {};
  const documentCookies = document.cookie ? document.cookie.split("; ") : [];

  for (let i = 0, len = documentCookies.length; i < len; i++) {
    const cookieParts = documentCookies[i].split("=");

    const _cookie = cookieParts.slice(1).join("=");
    const name = cookieParts[0];

    _cookies[name] = _cookie;
  }

  return _cookies;
};

export const getCookie = (key: string, options?: OptionsType): CookieValueTypes => {
  const _cookies = getCookies(options);
  const value = _cookies[key];
  if (value === undefined) return undefined;
  return processValue(decode(value));
};

export const setCookie = (key: string, value: string, options?: OptionsType): void => {
  let _cookieOptions: Partial<CookieSerializeOptions> = {};
  let _req;
  let _res;
  if (options) {
    const { req, res, ..._options } = options;
    _req = req;
    _res = res;
    _cookieOptions = _options;
  }

  // Default cookie options are overriden by options passed to setCookie
  const _defaultCookieOptions = { ...defaultCookieOptions, ..._cookieOptions };

  const cookieStr = serialize(key, value, { path: "/", ..._defaultCookieOptions });
  if (!isClientSide()) {
    if (_res && _req) {
      let currentCookies = _res.getHeader("Set-Cookie");

      if (!Array.isArray(currentCookies)) {
        currentCookies = !currentCookies ? [] : [String(currentCookies)];
      }
      _res.setHeader("Set-Cookie", currentCookies.concat(cookieStr));

      // if cookie-parser is used in project get cookies from ctx.req.cookies
      if (_req && _req.cookies) {
        const _cookies = _req.cookies;
        // if value is empty string delete cookie
        if (value === "") delete _cookies[key];
        else _cookies[key] = value;
      }

      // if cookie-parser isn't used in project get cookies from ctx.req.headers.cookie
      if (_req && _req.headers && _req.headers.cookie) {
        const _cookies = parse(_req.headers.cookie);

        // if value is empty string delete cookie
        if (value === "") delete _cookies[key];
        else _cookies[key] = value;

        _req.headers.cookie = Object.entries(_cookies).reduce((accum, item) => {
          return accum.concat(`${item[0]}=${item[1]};`);
        }, "");
      }
    }
  } else {
    document.cookie = cookieStr;
  }
};

export const deleteCookie = (key: string, options?: OptionsType): void => {
  return setCookie(key, "", { ...options, maxAge: -1 });
};

export const hasCookie = (key: string, options?: OptionsType): boolean => {
  if (!key) return false;

  const cookie = getCookies(options);
  return cookie[key] !== undefined;
};
