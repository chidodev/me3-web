export type Swap = {
  username?: string;
};

export type SwapEncodeReq = {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  to: string;
  chainId: number;
};

export type SwapReq = {};

export type SwapRes = {};
