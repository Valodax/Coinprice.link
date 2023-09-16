import { DataFeed } from "@/utils/Types/PriceFeedTypes";

interface priceFeeds {
  [name: string]: DataFeed;
}

interface timePeriods {
  [name: string]: boolean;
}

interface priceData {
  [key: string]: number | undefined;
}

export const calculatePercentage = (priceFeeds: priceFeeds, timePeriods: timePeriods) => {
  const priceFeedsWithPercentage: { [key: string]: DataFeed } = {};
  const now = Math.floor(Date.now() / 1000);
  const timeAgo = {
    "1h": now - 60 * 60,
    "2h": now - 2 * 60 * 60,
    "4h": now - 4 * 60 * 60,
    "6h": now - 6 * 60 * 60,
    "12h": now - 12 * 60 * 60,
    "24h": now - 24 * 60 * 60,
    "7d": now - 7 * 24 * 60 * 60,
    "1m": now - 30 * 24 * 60 * 60,
    "1y": now - 365 * 24 * 60 * 60,
    All: now,
  };

  Object.entries(priceFeeds).forEach(([symbol, priceFeed]) => {
    let priceData: priceData = {};
    Object.entries(timeAgo).forEach(([period, time]) => {
      if (timePeriods[period]) {
        const prices = priceFeed.prices.filter((price) => parseInt(price.blockTimestamp) >= time);
        let percentage;
        if (prices.length > 1) {
          const currentPrice = parseInt(prices[prices.length - 1].price);
          const priceAgo = parseInt(prices[0].price);
          percentage = ((currentPrice - priceAgo) / priceAgo) * 100;
        }
        priceData[`percentage${period}`] = percentage;
      }
    });
    priceFeedsWithPercentage[symbol] = {
      ...priceFeed,
      ...priceData,
    };
  });

  return priceFeedsWithPercentage;
};
