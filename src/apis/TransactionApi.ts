import { walletAPIAxiosClient } from "@/helpers/axiosClient";
import * as API_ENDPOINTS from "@/constants/api";

import type { DynamicObject } from "@/models/DynamicObjectModel";
import type { Transaction } from "@/models/TransactionModel";

// TODO: Param data type need to be defined & follow Swagger API doc

export const sendBTC = async (params: Transaction) => {
  try {
    const res = await walletAPIAxiosClient.post(API_ENDPOINTS.SEND_BTC_TRANSACTION, params);
  } catch (err) {
    console.error(err);
  }
};

export const getTransactionHistory = async (params: DynamicObject) => {
  try {
    const res = await walletAPIAxiosClient.get(API_ENDPOINTS.GET_TRANSACTION_HISTORY, params);
  } catch (err) {
    console.error(err);
  }
};
