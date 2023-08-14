"use client";
import { useContext, useEffect } from "react";
import { PriceContext } from "@/context/PriceContext";
import { capitalizeFirstLetter } from "@/utils/HelperFunctions/CapitalizeFirstLetter";
import { formatPrice } from "@/utils/HelperFunctions/FormatPrice";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";

interface PriceTableDataProps {
    name: string;
    symbol: string;
}

export default function PriceTableData({ name, symbol }: PriceTableDataProps) {
    const { prices } = useContext(PriceContext);

    return (
        <div>
            <div className="flex items-center justify-center mt-4 py-5 lg:gap-10">
                <div className="flex justify-start w-2/12 lg:w-1/12">
                    <div className="lg:hidden">
                        <Image src={`/icons/tokens/${symbol}.svg`} alt={name} width={30} height={30} />
                    </div>
                    <div className="hidden lg:block">
                        <Image src={`/icons/tokens/${symbol}.svg`} alt={name} width={50} height={50} />
                    </div>
                </div>
                <div className="flex justify-start w-2/12 lg:w-1/12 font-bold text-sm md:text-lg lg:text-xl">
                    {symbol.toUpperCase()}
                </div>
                <div className="flex justify-start w-2/12 lg:w-1/12 font-semibold text-sm md:text-lg lg:text-xl">
                    {capitalizeFirstLetter(name)}
                </div>
                <div className="flex justify-end w-3/12 lg:w-2/12 font-semibold text-sm md:text-lg lg:text-xl text-sky-300">
                    {prices[symbol] && !prices[symbol].isLoading && !isNaN(parseFloat(prices[symbol].price)) ? (
                        parseFloat(prices[symbol].price) < 1 ? (
                            `$${formatPrice(prices[symbol].price, 5)}`
                        ) : (
                            `$${formatPrice(prices[symbol].price, 2)}`
                        )
                    ) : (
                        <ScaleLoader height={25} width={2} loading={true} color={"rgb(125 211 252)"} />
                    )}
                </div>
                <div
                    className={`flex justify-end w-2/12 lg:w-1/12 font-semibold text-sm md:text-lg lg:text-xl text-sky-300 ${
                        prices[symbol] && !prices[symbol].isPercentageLoading && prices[symbol].percentage! < 0
                            ? "text-red-400"
                            : "text-green-400"
                    }`}
                >
                    {prices[symbol] && !prices[symbol].isPercentageLoading && prices[symbol].percentage ? (
                        `${formatPrice(prices[symbol].percentage!, 1)}%`
                    ) : (
                        <ScaleLoader height={25} width={2} loading={true} color={"rgb(125 211 252)"} />
                    )}
                </div>
            </div>
        </div>
    );
}
