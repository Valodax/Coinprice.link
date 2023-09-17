"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { DataFeed, RawDataFeed } from "@/utils/Types/PriceFeedTypes";

interface AssetContextData {
  coinPriceFeeds: { [name: string]: DataFeed };
  fiatPriceFeeds: { [name: string]: DataFeed };
  selectedAsset: string;
  setSelectedAsset: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

export const AssetContext = createContext<AssetContextData>({
  coinPriceFeeds: {},
  fiatPriceFeeds: {},
  selectedAsset: "",
  setSelectedAsset: () => {},
  isLoading: false,
});

// Create context provider and specify the type
export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coinPriceFeeds, setCoinPriceFeeds] = useState<{ [name: string]: DataFeed }>({});
  const [fiatPriceFeeds, setFiatPriceFeeds] = useState<{ [name: string]: DataFeed }>({});
  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeFilter, setTimeFilter] = useState(Math.floor(Date.now() / 1000) - 365 * 24 * 60 * 60);

  const createFeedObject = (feed: RawDataFeed) => {
    return {
      id: feed.id,
      decimals: feed.decimals,
      prices: feed.prices,
      asset: feed.asset,
      denomination: feed.denomination,
      assetAddress: feed.assetAddress,
      denominationAddress: feed.denominationAddress,
      timeLastUpdated: feed.prices[feed.prices.length - 1].blockTimestamp,
    };
  };

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_URL + "/api/graphAssetSpecific", {
        method: "POST",
        body: JSON.stringify({ asset: selectedAsset, timeFilter: timeFilter }),
      });
      const data = await response.json();

      console.log("running this code");

      console.log(`${selectedAsset} Response:`, data);

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
        setFiatPriceFeeds(fiatPriceFeeds);
      }
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [selectedAsset]);

  return (
    <AssetContext.Provider
      value={{
        coinPriceFeeds,
        fiatPriceFeeds,
        selectedAsset,
        setSelectedAsset,
        isLoading,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};
