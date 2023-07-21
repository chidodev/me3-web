import type { ChainNetwork } from "@/models/ChainNetworkModel";

// local storage key
export const WALLET = "wallet";

//Binance Smart Chain
export const SUPPORTED_NETWORKS: ChainNetwork[] = [
  {
    id: "137",
    chainId: 137,
    chainName: "Polygon",
    displayName: "Polygon",
  },
  {
    id: "80001",
    chainId: 80001,
    chainName: "PolygonTest",
    displayName: "Mumbai",
  },
  {
    id: "56",
    chainId: 43114,
    chainName: "AVAX",
    displayName: "Avalanche",
  },
  {
    id: "43113",
    chainId: 43113,
    chainName: "Fuji",
    displayName: "Avalanche Testnet",
  },
  {
    id: "1",
    chainId: 1,
    chainName: "ETH",
    displayName: "Ethereum Mainnet",
  },
];
