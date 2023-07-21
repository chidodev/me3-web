export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";

export const siteURL = process.env.NEXT_PUBLIC_URL as string;
export const siteName = process.env.NEXT_PUBLIC_TITLE as string;
export const siteDescription = process.env.NEXT_PUBLIC_DESCRIPTION as string;

export const walletApiUrl = process.env.NEXT_PUBLIC_WALLET_API_URL as string;
