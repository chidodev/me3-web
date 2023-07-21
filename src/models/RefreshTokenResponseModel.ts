export type RefreshTokenResponse = {
  google_access: string;
  kc_access: string;
  rsaPubKey: string;
  kc_refresh?: string;
  uid?: string;
  password?: string;
  salt?: string;
};
