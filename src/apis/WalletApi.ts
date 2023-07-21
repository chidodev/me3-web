import { walletAPIAxiosClient } from "@/helpers/axiosClient";
import * as API_ENDPOINTS from "@/constants/api";

// TODO: Param data type need to be defined & follow Swagger API doc
// Real Endpoints

// GET
export const getTotalAssets = async (params: any) => {
  try {
    const res = walletAPIAxiosClient.get(API_ENDPOINTS.GET_TOTAL_ASSETS, { params });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getFocusChains = async (params: any) => {
  try {
    const res = walletAPIAxiosClient.get(API_ENDPOINTS.GET_FOCUS_CHAINS, { params });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getChainAssets = async (params: any) => {
  try {
    const res = walletAPIAxiosClient.get(API_ENDPOINTS.GET_CHAIN_ASSETS, { params });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getTokenToImport = async (params: any) => {
  try {
    const res = walletAPIAxiosClient.get(API_ENDPOINTS.GET_TOKENS_TO_IMPORT, { params });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getFollowToken = async (params: any) => {
  try {
    const res = walletAPIAxiosClient.get(API_ENDPOINTS.FOLLOW_TOKEN, { params });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getSupportCurrency = async (params: any) => {
  try {
    const res = walletAPIAxiosClient.get(API_ENDPOINTS.GET_SUPPORT_CURRENCY, { params });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getCoinDetail = async (params: any) => {
  try {
    const res = walletAPIAxiosClient.get(API_ENDPOINTS.GET_COIN_DETAIL, { params });
    return res;
  } catch (err) {
    console.error(err);
  }
};

// POST
export const addCustomToken = async (params: any) => {
  try {
    const res = walletAPIAxiosClient.post(API_ENDPOINTS.ADD_CUSTOM_TOKEN, params);
    return res;
  } catch (err) {
    console.error(err);
  }
};
