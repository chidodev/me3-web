import { walletAPIAxiosClient } from "@/helpers/axiosClient";
import * as API_ENDPOINTS from "@/constants/api";

import type { Coin } from "@/models/CoinModel";

// TODO: Param data type need to be defined & follow Swagger API doc
export const getCoinList = async (params: Coin) => {
  const res = await walletAPIAxiosClient.get(API_ENDPOINTS.GET_COIN, { params });
};

export const getCoinDetail = async (params: Coin) => {
  const res = await walletAPIAxiosClient.get(API_ENDPOINTS.GET_COIN_DETAIL, { params });
};
