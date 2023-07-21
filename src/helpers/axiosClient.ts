import axios from "axios";

import { AXIOS_TIMEOUT, BASE_URL } from "@/constants/api";

// axios instance with base url and headers
export const walletAPIAxiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: AXIOS_TIMEOUT,

  headers: {
    "Content-Type": "application/json",
  },
});

// axios instance for next api
export const nextAPIAxiosClient = axios.create({
  timeout: AXIOS_TIMEOUT,

  headers: {
    "Content-Type": "application/json",
  },
});
