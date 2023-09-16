"use client";
import { useContext } from "react";
import { DataFeed } from "@/utils/Types/PriceFeedTypes";
import { PriceContext } from "@/context/PriceContext";
import { formatPrice } from "@/utils/HelperFunctions/FormatPrice";
import { ScaleLoader } from "react-spinners";
import { currentPrice } from "@/utils/HelperFunctions/CurrentPrice";
import Image from "next/image";
import SparklineChart from "@/components/SparklineChart";
import Link from "next/link";

interface Props {
  isFiat?: boolean;
}

export default function PriceTableData({ isFiat }: Props) {
  const { coinPriceFeeds, fiatPriceFeeds, isLoading, isPercentageLoading } = useContext(PriceContext);

  const getData = (priceFeed: DataFeed) => {
    let pricesCopy = [...priceFeed.prices];

    const data = pricesCopy.map((priceData) => {
      return {
        round: parseInt(priceData.roundId),
        value: parseInt(priceData.price),
      };
    });
    return data;
  };

  return (
    <div>
      {Object.entries(isFiat ? fiatPriceFeeds : coinPriceFeeds).map(([symbol, priceFeed]) => (
        <div key={symbol}>
          <div className="flex items-center justify-center mt-4">
            <div className="flex justify-start w-3/12 md:w-2/12 lg:w-1/12 items-center gap-x-7">
              <div className="lg:hidden rounded-full overflow-hidden">
                <Image
                  src={
                    isFiat
                      ? `/icons/fiat/square/${priceFeed.asset.toLowerCase()}.svg`
                      : `/icons/coins/${priceFeed.asset.toLowerCase()}.svg`
                  }
                  alt={symbol}
                  width={25}
                  height={25}
                />
              </div>
              <div className="hidden lg:block rounded-full overflow-hidden">
                <Image
                  src={
                    isFiat
                      ? `/icons/fiat/square/${priceFeed.asset.toLowerCase()}.svg`
                      : `/icons/coins/${priceFeed.asset.toLowerCase()}.svg`
                  }
                  alt={symbol}
                  width={30}
                  height={30}
                />
              </div>

              <Link href={isFiat ? `/fiat/${priceFeed.asset.toLowerCase()}` : `/${priceFeed.asset.toLowerCase()}`}>
                <button className="flex justify-start w-3/12 hover:text-sky-500 md:text-lg lg:text-xl">
                  <div className="flex items-baseline font-semibold text-md md:text-lg lg:text-xl">
                    <span>{symbol.split("/")[0]}</span>
                  </div>
                </button>
              </Link>
            </div>
            <div
              className={`flex justify-end w-3/12 lg:w-3/12 font-semibold text-sm md:text-lg lg:text-xl ${
                priceFeed && !isPercentageLoading
                  ? priceFeed.percentage24h
                    ? priceFeed.percentage24h < 0
                      ? "text-red-400"
                      : priceFeed.percentage24h > 0
                      ? "text-green-400"
                      : "text-sky-300"
                    : "text-sky-300"
                  : "text-sky-300"
              }`}
            >
              {priceFeed && !isLoading && !isNaN(parseFloat(currentPrice(priceFeed).toString())) ? (
                parseFloat(currentPrice(priceFeed).toString()) < 1 ? (
                  `$${formatPrice(currentPrice(priceFeed), 5)}`
                ) : (
                  `$${formatPrice(currentPrice(priceFeed), 2)}`
                )
              ) : (
                <ScaleLoader height={25} width={2} loading={true} color={"rgb(125 211 252)"} />
              )}
            </div>
            <div
              className={`flex justify-end w-2/12 lg:w-1/12 font-semibold text-sm md:text-lg lg:text-xl ${
                priceFeed && !isPercentageLoading
                  ? priceFeed.percentage24h
                    ? priceFeed.percentage24h < 0
                      ? "text-red-400"
                      : priceFeed.percentage24h > 0
                      ? "text-green-400"
                      : "text-sky-300"
                    : "text-sky-300"
                  : "text-sky-300"
              }`}
            >
              {isPercentageLoading ? (
                <ScaleLoader height={25} width={2} loading={true} color={"rgb(125 211 252)"} />
              ) : priceFeed && priceFeed.percentage24h ? (
                `${formatPrice(priceFeed.percentage24h, 1)}%`
              ) : (
                "-"
              )}
            </div>
            <div
              className={`hidden lg:flex justify-end lg:w-1/12 font-semibold text-sm lg:text-xl ${
                priceFeed && !isPercentageLoading
                  ? priceFeed.percentage7d
                    ? priceFeed.percentage7d < 0
                      ? "text-red-400"
                      : priceFeed.percentage7d > 0
                      ? "text-green-400"
                      : "text-sky-300"
                    : "text-sky-300"
                  : "text-sky-300"
              }`}
            >
              {isPercentageLoading ? (
                <ScaleLoader height={25} width={2} loading={true} color={"rgb(125 211 252)"} />
              ) : priceFeed && priceFeed.percentage7d ? (
                `${formatPrice(priceFeed.percentage7d, 1)}%`
              ) : (
                "-"
              )}
            </div>
            <div className="flex justify-end w-3/12 lg:w-2/12">
              {isPercentageLoading ? (
                <ScaleLoader height={25} width={2} loading={true} color={"rgb(125 211 252)"} />
              ) : (
                <SparklineChart data={getData(priceFeed)} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
