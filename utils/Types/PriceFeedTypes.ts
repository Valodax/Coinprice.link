export interface RawDataFeed {
  name: string;
  id: string;
  decimals: number;
  prices: Price[];
  asset: string;
  assetAddress: string;
  denomination: string;
  denominationAddress: string;
}

export interface DataFeed {
  id: string;
  decimals: number;
  prices: Price[];
  percentage7d?: number;
  percentage24h?: number;
  asset: string;
  assetAddress: string;
  denomination: string;
  denominationAddress: string;
  timeLastUpdated: string;
  priceUpdates24h: number;
  priceUpdates7d: number;
}

export interface Price {
  price: string;
  blockTimestamp: string;
  roundId: string;
}
