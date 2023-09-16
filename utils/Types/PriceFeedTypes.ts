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
  asset: string;
  assetAddress: string;
  denomination: string;
  denominationAddress: string;
  timeLastUpdated: string;
  priceUpdates24h?: number;
  priceUpdates7d?: number;
  priceUpdates1m?: number;
  priceUpdates1y?: number;
  priceUpdatesAll?: number;
  percentage24h?: number;
  percentage7d?: number;
  percentage1m?: number;
  percentage1y?: number;
  percentageAll?: number;
}

export interface Price {
  price: string;
  blockTimestamp: string;
  roundId: string;
}
