"use client";

import React, { createContext, useState, useEffect, useRef } from "react";
import { calculatePercentage } from "@/utils/HelperFunctions/CalculatePercentageChanges";
import { DataFeed, RawDataFeed } from "@/utils/Types/PriceFeedTypes";

interface PriceContextData {
  coinPriceFeeds: { [name: string]: DataFeed };
  fiatPriceFeeds: { [name: string]: DataFeed };
  ethereumPrice: number;
  isLoading: boolean;
  isPercentageLoading: boolean;
}

export const PriceContext = createContext<PriceContextData>({
  coinPriceFeeds: {},
  fiatPriceFeeds: {},
  ethereumPrice: 0,

  isLoading: false,
  isPercentageLoading: false,
});

// get the current time as a unix timestamp minus 1 day ago
export const PriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ethereumPrice, setEthereumPrice] = useState<number>(0);
  const [coinPriceFeeds, setCoinPriceFeeds] = useState<{ [name: string]: DataFeed }>({});
  const [fiatPriceFeeds, setFiatPriceFeeds] = useState<{ [name: string]: DataFeed }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPercentageLoading, setIsPercentageLoading] = useState<boolean>(true);
  const hasCalculatedPercentage = useRef(false);

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
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_URL + "/api/graphMainQuery");
      const data = await response.json();

      if (data.data.dataFeeds) {
        let coinPriceFeeds: { [key: string]: DataFeed } = {};
        let fiatPriceFeeds: { [key: string]: DataFeed } = {};

        data.data.dataFeeds.forEach((feed: RawDataFeed) => {
          if (feed.prices.length > 0) {
            if (feed.assetAddress.startsWith("0x0000000000000000000")) {
              fiatPriceFeeds[feed.name] = createFeedObject(feed);
            } else {
              coinPriceFeeds[feed.name] = createFeedObject(feed);
            }
          }
        });

        setCoinPriceFeeds(coinPriceFeeds);
        hasCalculatedPercentage.current = false;
        setFiatPriceFeeds(fiatPriceFeeds);
      }
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Check if either coinPriceFeeds or fiatPriceFeeds is not set
    if (Object.keys(coinPriceFeeds).length === 0 || Object.keys(fiatPriceFeeds).length === 0) {
      return;
    }

    if (!hasCalculatedPercentage.current) {
      const timePeriods = {
        "24h": true,
        "7d": true,
      };
      const coinPriceFeedsWithPercentage = calculatePercentage(coinPriceFeeds, timePeriods);
      setCoinPriceFeeds(coinPriceFeedsWithPercentage);

      const fiatPriceFeedsWithPercentage = calculatePercentage(fiatPriceFeeds, timePeriods);
      setFiatPriceFeeds(fiatPriceFeedsWithPercentage);

      hasCalculatedPercentage.current = true;
      setIsPercentageLoading(false);
    }
  }, [coinPriceFeeds, fiatPriceFeeds]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PriceContext.Provider
      value={{
        coinPriceFeeds,
        fiatPriceFeeds,
        ethereumPrice,

        isLoading,
        isPercentageLoading,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};
