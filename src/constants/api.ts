import { walletApiUrl } from "@/helpers/env";

// TODO= Apply config file to point to different API endpoints depending on the environment.
export const BASE_URL = walletApiUrl;
export const AXIOS_TIMEOUT = 10000;

// Endpoints
export const GET_ACCESS_TOKEN = "/api/gameInfo/googleCode";
export const SET_GET_DRIVE_FILE_ID = "/api/light/userfileId";
export const GET_ALL_PREVIOUS_WALLET = "/api/light/secretList";
export const GET_CHAIN_LIST = "/api/mainChain/list";
export const ADD_SYMBOL_ADDRESS_NOTE = "/api/lightsymboladdress/addAddress";
export const ADD_WALLET = "/api/light/addWallet";
export const GET_COIN = "/api/light/focus_coin_list?";
export const GET_TOTAL_ASSETS = "/api/mainChain/totalAssets";
export const GET_FOCUS_CHAINS = "/api/mainChain/focusList";
export const GET_CHAIN_ASSETS = "/api/mainChain/chainAssets";
export const GET_SUPPORT_CURRENCY = "/api/light/supportCurrency";
export const GET_COIN_DETAIL = "/api/light/coinDetail";
export const GET_UTX_TO_LIST = "/api/light/forward/getUtxo";
export const GET_TOKENS_TO_IMPORT = "/api/light/searchToken";
export const FOLLOW_TOKEN = "/api/light/add_coin_focus";
export const SEND_BTC_TRANSACTION = "/api/light/forward/sendRawTransaction";
export const GET_SWAP_TOKEN_LIST = "/api/light/swapCoin";
export const ADD_CUSTOM_TOKEN = "/api/light/importToken";
export const GET_NFT_LIST = "/api/light/focus_nft_list";
export const GET_HISTORY = "/api/lightaddresstransactionlog/txHistory";
export const GET_NFT_DETAIL = "/api/light/nftDetail";
export const API_KEY_EXCHANGE = "/api/light/exchange/key";
export const API_REGISTER = "/api/light/register";
export const GET_TRANSACTION_HISTORY = "/api/lightaddresstransactionlog/txInfo";
export const FAQ_LIST = "/api/content/helpCenter";
export const FAQ_DETAILS = "/api/content/detail/";

// External Endpoints
export const KYBER_BASE_URL = "https://aggregator-api.kyberswap.com/";
