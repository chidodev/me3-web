import { walletAPIAxiosClient } from "@/helpers/axiosClient";
import * as API_ENDPOINTS from "@/constants/api";

import type { Gas } from "@/models/GasModel";

// TODO: Param data type need to be defined & follow Swagger API doc
export const getUTXToList = async (params: Gas) => {
  const res = await walletAPIAxiosClient.get(API_ENDPOINTS.GET_UTX_TO_LIST, { params });
};
