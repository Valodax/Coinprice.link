"use client";
import { useContractCustomUsd } from "@/utils/Hooks/useContractCustomUsd";
import { SpecialFeeds } from "@/utils/ContractRepository/Ethereum/Contracts";
import { formatPrice } from "@/utils/HelperFunctions/FormatPrice";

export default function Hero() {
    const marketCapFeed = SpecialFeeds["Total Market Cap"];
    const { price, isLoading, error } = useContractCustomUsd(marketCapFeed);
    return (
        <section className="flex flex-col justify-center items-center w-full min-h-[20vh]">
            <h1 className="text-3xl font-bold pb-5">Cryptocurrency Prices</h1>
            <h2 className="text-l">
                Total Crypto Market Cap:{" "}
                <span className="text-sky-300">
                    {!isLoading && price
                        ? `$${formatPrice((parseFloat(price) / 1000000000000).toString(), 2)}T`
                        : "Loading..."}
                </span>
            </h2>
        </section>
    );
}
