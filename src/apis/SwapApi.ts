import axios from "axios";

import { walletAPIAxiosClient } from "@/helpers/axiosClient";
import * as API_ENDPOINTS from "@/constants/api";

import type { SwapEncodeReq, Swap } from "@/models/SwapModel";

// TODO: Param data type need to be defined & follow Swagger API doc
export const getSwapTokenList = async (params: Swap) => {
  try {
    const res = await walletAPIAxiosClient.get(API_ENDPOINTS.GET_SWAP_TOKEN_LIST, {
      params,
    });
  } catch (err) {
    console.error(err);
  }
};

//TODO: Refactor this function from the mobile app repo
function supportSwapChain(chainId: number) {
  let chain;
  switch (chainId) {
    case 1:
      chain = "ethereum";
      break;
    case 137:
      chain = "polygon";
      break;
    case 4:
      chain = "rinkeby";
      break;
    case 56:
      chain = "bsc";
      break;
    case 43114:
      chain = "avalanche";
      break;
    default:
      chain = "ethereum";
  }
  return chain;
}

export const getSwapEncode = async (params: SwapEncodeReq) => {
  try {
    const { tokenIn, tokenOut, amountIn, to, chainId } = params;
    const chain = supportSwapChain(chainId);
    const res = await axios.get(`${API_ENDPOINTS.KYBER_BASE_URL}${chain}/route/encode`, {
      params: {
        tokenIn: { tokenIn },
        tokenOut: { tokenOut },
        amountIn: { amountIn },
        saveGas: 0,
        slippageTolerance: 50,
        to: { to },
        clientData: { source: "kyberswap" },
      },
    });
  } catch (err) {
    console.error(err);
  }
};
