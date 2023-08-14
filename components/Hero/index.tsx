"use client";
import { useContractCustomUsd } from "@/utils/Hooks/useContractCustomUsd";
import { SpecialFeeds } from "@/utils/ContractRepository/Ethereum/Contracts";
import { formatPrice } from "@/utils/HelperFunctions/FormatPrice";
import { ScaleLoader } from "react-spinners";

export default function Hero() {
    const marketCapFeed = SpecialFeeds["Total Market Cap"];
    const { price, isLoading, error } = useContractCustomUsd(marketCapFeed);
    return (
        <section className="flex flex-col justify-center pb-5 items-center w-full min-h-[20vh]">
            <h1 className="text-2xl md:text-4xl font-bold pb-3">Cryptocurrency Prices</h1>
            <h2 className="flex text-base md:text-xl">
                Total Crypto Market Cap:{" "}
                <span className="flex text-sky-300 ml-3">
                    {!isLoading && price ? (
                        `$${formatPrice((parseFloat(price) / 1000000000000).toString(), 2)}T`
                    ) : (
                        <div className="pt-0.5">
                            <ScaleLoader height={15} width={2} loading={true} color={"rgb(125 211 252)"} />
                        </div>
                    )}
                </span>
            </h2>
        </section>
    );
}
