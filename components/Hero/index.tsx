"use client";
import { useContractCustomUsd } from "@/utils/Hooks/useContractCustomUsd";
import { SpecialFeeds } from "@/utils/ContractRepository/Ethereum/Contracts";
import { formatPrice } from "@/utils/HelperFunctions/FormatPrice";
import { ScaleLoader } from "react-spinners";

export default function Hero() {
  const marketCapFeed = SpecialFeeds["Total Market Cap"];
  const { price, isLoading, error } = useContractCustomUsd(marketCapFeed);
  return (
    <section className="flex flex-col justify-center items-center w-full min-h-[18vh] lg:min-h-[20vh]">
      <h1 className="text-3xl lg:text-4xl font-bold">CoinPriceLink</h1>
      <h2 className="flex text-base lg:text-xl pt-1">
        Total Crypto Market Cap:
        <span className="flex text-sky-300 ml-3">
          {!isLoading && price ? (
            `$${formatPrice((parseFloat(price) / 1000000000000).toString(), 2)}T`
          ) : (
            <div className="flex justify-end items-bottom">
              <ScaleLoader height={20} width={2} loading={true} color={"rgb(125 211 252)"} />
            </div>
          )}
        </span>
      </h2>
    </section>
  );
}
