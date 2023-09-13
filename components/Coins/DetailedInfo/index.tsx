"use client";
import { useContext } from "react";
import { PriceContext } from "@/context/PriceContext";

export default function DetailedInfo() {
  const { selectedRow, coinPriceFeeds } = useContext(PriceContext);

  const selectedPriceFeed = coinPriceFeeds[selectedRow];

  return (
    <div className="flex flex-col items-center justify-center">
      <div>Price Feed Contract Address: {selectedPriceFeed ? selectedPriceFeed.id : "Address not found"}</div>
      <div>Asset Contract Address: {selectedPriceFeed ? selectedPriceFeed.assetAddress : "Address not found"}</div>
      <div>
        Time Last Updated:{" "}
        {selectedPriceFeed
          ? new Date(parseFloat(selectedPriceFeed.timeLastUpdated) * 1000).toLocaleString()
          : "Time not found"}
      </div>
      <div>
        Number of price updates in 24h Period: {selectedPriceFeed ? selectedPriceFeed.priceUpdates24h : "No Updates"}
      </div>
      <div>
        Number of price updates in 7d Period: {selectedPriceFeed ? selectedPriceFeed.priceUpdates7d : "No Updates"}
      </div>
    </div>
  );
}
