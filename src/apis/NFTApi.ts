import { walletAPIAxiosClient } from "@/helpers/axiosClient";
import * as API_ENDPOINTS from "@/constants/api";

import type { NFT } from "@/models/NFTModel";

// TODO: Param data type need to be defined & follow Swagger API doc
export const getNFTList = async (params: NFT) => {
  const res = await walletAPIAxiosClient.get(API_ENDPOINTS.GET_NFT_LIST, { params });
};

export const getNFTDetail = async (params: NFT) => {
  const res = await walletAPIAxiosClient.get(API_ENDPOINTS.GET_NFT_DETAIL, { params });
};
