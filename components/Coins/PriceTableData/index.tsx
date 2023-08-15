"use client";
import { useContext } from "react";
import { PriceContext } from "@/context/PriceContext";
import { capitalizeFirstLetter } from "@/utils/HelperFunctions/CapitalizeFirstLetter";
import { formatPrice } from "@/utils/HelperFunctions/FormatPrice";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";
import DetailedInfo from "@/components/Coins/DetailedInfo";

interface PriceTableDataProps {
    name: string;
    symbol: string;
}

export default function PriceTableData({ name, symbol }: PriceTableDataProps) {
    const { prices, setSelectedRow, selectedRow } = useContext(PriceContext);

    const handleRowClick = (symbol: string) => {
        console.log("symbol", symbol);
        setSelectedRow(selectedRow === symbol ? "" : symbol);
    };

    return (
        <div>
            <div className="flex items-center justify-center mt-4 py-5">
                <div className="flex justify-start w-4/12 md:w-2/12 lg:w-1/12 items-center gap-x-7">
                    <div className="lg:hidden">
                        <Image src={`/icons/tokens/${symbol}.svg`} alt={name} width={30} height={30} />
                    </div>
                    <div className="hidden lg:block">
                        <Image src={`/icons/tokens/${symbol}.svg`} alt={name} width={50} height={50} />
                    </div>

                    <button
                        onClick={handleRowClick.bind(null, symbol)}
                        className="flex justify-start w-3/12 hover:text-sky-500 transition-colors duration-500 md:text-lg lg:text-xl"
                    >
                        <div className="flex gap-3 lg:gap-5 items-baseline">
                            <span className="font-semibold text-md md:text-lg lg:text-xl">
                                {capitalizeFirstLetter(name)}
                            </span>
                            <span className="text-sm md:text-lg lg:text-xl">{symbol.toUpperCase()}</span>
                        </div>
                    </button>
                </div>
                <div
                    className={`flex justify-end w-4/12 lg:w-3/12 font-semibold text-sm md:text-lg lg:text-xl ${
                        prices[symbol] && !prices[symbol].isPercentageLoading
                            ? prices[symbol].percentage! < 0
                                ? "text-red-400 transition-colors duration-[5000ms]"
                                : "text-green-400 transition-colors duration-[5000ms]"
                            : "text-sky-300"
                    }`}
                >
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
                    className={`flex justify-end w-1.5/12 lg:w-1/12 font-semibold text-sm md:text-lg lg:text-xl ${
                        prices[symbol] && !prices[symbol].isPercentageLoading
                            ? prices[symbol].percentage! < 0
                                ? "text-red-400 transition-colors duration-[5000ms]"
                                : "text-green-400 transition-colors duration-[5000ms]"
                            : "text-sky-300"
                    }`}
                >
                    {prices[symbol] && !prices[symbol].isPercentageLoading && prices[symbol].percentage ? (
                        `${formatPrice(prices[symbol].percentage!, 1)}%`
                    ) : (
                        <ScaleLoader height={25} width={2} loading={true} color={"rgb(125 211 252)"} />
                    )}
                </div>
            </div>
            {selectedRow === symbol && <DetailedInfo />}
        </div>
    );
}
