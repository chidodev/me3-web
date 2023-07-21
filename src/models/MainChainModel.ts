export type ChainItem = {
  id: number;
  name: string;
  symbol: string;
  symbolIcon: string;
  description: string;
  chainId: string;
  node: string;
  series: string;
  hdCoinId: number;
  path: string;
  icon: string;
  activeIcon: string;
  sort: number;
  state: number;
  companyId: number;
  txUrl: string;
  supportNft: number;
  supportDapp: number;
  ctime: number;
  mtime: number;
  currency: string;
  symbolRate: number;
  change: string;
};

export type ChainItemShort = {
  chainName: string;
  walletName: string;
};

export type GroupedChainItem = Record<string, ChainItemShort[]>;
