"use client";

import React, { createContext, useState, useEffect } from "react";
import { DataFeed, RawDataFeed } from "@/utils/Types/PriceFeedTypes";

interface PriceContextData {
  coinPriceFeeds: { [name: string]: DataFeed };
  fiatPriceFeeds: { [name: string]: DataFeed };
  ethereumPrice: number;
  selectedRow: string;
  setSelectedRow: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  isPercentageLoading: boolean;
}

export const PriceContext = createContext<PriceContextData>({
  coinPriceFeeds: {},
  fiatPriceFeeds: {},
  ethereumPrice: 0,
  selectedRow: "",
  setSelectedRow: () => {},
  isLoading: false,
  isPercentageLoading: false,
});

// get the current time as a unix timestamp minus 1 day ago
export const PriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ethereumPrice, setEthereumPrice] = useState<number>(0);
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [coinPriceFeeds, setCoinPriceFeeds] = useState<{ [name: string]: DataFeed }>({});
  const [fiatPriceFeeds, setFiatPriceFeeds] = useState<{ [name: string]: DataFeed }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPercentageLoading, setIsPercentageLoading] = useState<boolean>(false);
  const [isInitialData, setIsInitialData] = useState(true);

  const calculatePercentage = (coinPriceFeeds: { [name: string]: DataFeed }) => {
    const priceFeedsWithPercentage: { [key: string]: DataFeed } = {};
    const now = Math.floor(Date.now() / 1000);
    const oneDayAgo = now - 24 * 60 * 60;
    const oneWeekAgo = now - 7 * 24 * 60 * 60;

    Object.entries(coinPriceFeeds).forEach(([symbol, priceFeed]) => {
      const prices24hAgo = priceFeed.prices.filter((price) => parseInt(price.blockTimestamp) >= oneDayAgo);
      const prices7dAgo = priceFeed.prices.filter((price) => parseInt(price.blockTimestamp) >= oneWeekAgo);

      // calculate 24h percentage change
      let percentage24h;
      if (prices24hAgo.length > 1) {
        const currentPrice24h = parseInt(prices24hAgo[prices24hAgo.length - 1].price);
        const price24hAgo = parseInt(prices24hAgo[0].price);
        percentage24h = ((currentPrice24h - price24hAgo) / price24hAgo) * 100;
      }

      // calculate 7D percentage change
      let percentage7d;
      if (prices7dAgo.length > 1) {
        const currentPrice7D = parseInt(priceFeed.prices[prices7dAgo.length - 1].price);
        const price7DAgo = parseInt(prices7dAgo[0].price);
        percentage7d = ((currentPrice7D - price7DAgo) / price7DAgo) * 100;
      }

      priceFeedsWithPercentage[symbol] = {
        ...priceFeed,
        percentage24h,
        percentage7d,
      };
    });

    return priceFeedsWithPercentage;
  };

  const createFeedObject = (feed: RawDataFeed) => {
    const now = Math.floor(Date.now() / 1000);
    const oneDayAgo = now - 24 * 60 * 60;
    const oneWeekAgo = now - 7 * 24 * 60 * 60;

    return {
      id: feed.id,
      decimals: feed.decimals,
      prices: feed.prices,
      asset: feed.asset,
      denomination: feed.denomination,
      assetAddress: feed.assetAddress,
      denominationAddress: feed.denominationAddress,
      timeLastUpdated: feed.prices[feed.prices.length - 1].blockTimestamp,
      priceUpdates24h: feed.prices.filter((price) => parseInt(price.blockTimestamp) >= oneDayAgo).length,
      priceUpdates7d: feed.prices.filter((price) => parseInt(price.blockTimestamp) >= oneWeekAgo).length,
    };
  };

  const fetchData = async () => {
    setIsLoading(true);
    setIsPercentageLoading(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_URL + "/api/theGraph");
      const data = await response.json();

      if (data.data.dataFeeds) {
        let coinPriceFeeds: { [key: string]: DataFeed } = {};
        let fiatPriceFeeds: { [key: string]: DataFeed } = {};

        data.data.dataFeeds.forEach((feed: RawDataFeed) => {
          if (feed.prices.length > 0) {
            if (feed.assetAddress.startsWith("0x00000")) {
              fiatPriceFeeds[feed.name] = createFeedObject(feed);
            } else {
              coinPriceFeeds[feed.name] = createFeedObject(feed);
            }
          }
        });

        setCoinPriceFeeds(coinPriceFeeds);
        setIsInitialData(false);
        setFiatPriceFeeds(fiatPriceFeeds);
      }
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isInitialData) {
      const priceFeedsWithPercentage = calculatePercentage(coinPriceFeeds);
      setCoinPriceFeeds(priceFeedsWithPercentage);
      setIsPercentageLoading(false);
    }
  }, [coinPriceFeeds, isInitialData]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PriceContext.Provider
      value={{
        coinPriceFeeds,
        fiatPriceFeeds,
        ethereumPrice,
        selectedRow,
        setSelectedRow,
        isLoading,
        isPercentageLoading,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};
