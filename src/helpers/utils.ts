import { has } from "lodash-es";

import type { SyntheticEvent } from "react";

export const compareText = (a: string, b: string): number => {
  return a.toString().localeCompare(b);
};

export function preventBubbling(callback?: ((...args: never[]) => unknown) | null, noPreventDefault?: boolean) {
  return (e: SyntheticEvent): void => {
    e.stopPropagation();

    if (!noPreventDefault) e.preventDefault();
    if (callback) callback();
  };
}

export function sleep(ms: number, callbackFn: () => void): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
      callbackFn();
    }, ms),
  );
}

export function delayScroll(ms: number) {
  return (): NodeJS.Timeout => setTimeout(() => window.scrollTo(0, 0), ms);
}

// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
const biggerTruncateRegex = /^(0x[a-zA-Z0-9]{18})[a-zA-Z0-9]+([a-zA-Z0-9]{18})$/;

/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @param smaller For Big bois display length
 * @returns Truncated address
 */
export function truncateEthAddress(address: string, smaller = true): string {
  let match: RegExpMatchArray | null;
  if (smaller) {
    match = address.match(truncateRegex);
  } else {
    match = address.match(biggerTruncateRegex);
  }

  if (!match) return address;
  return `${match[1]}…${match[2]}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateObject(obj: Record<string, any>, requiredProps: string[]): boolean {
  // Check if all required properties are present in the object
  for (let i = 0; i < requiredProps.length; i++) {
    if (!has(obj, requiredProps[i])) {
      return false;
    }
  }
  return true;
}
