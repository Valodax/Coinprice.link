"use client";

import { capitalizeFirstLetter } from "@/utils/HelperFunctions/CapitalizeFirstLetter";
import { formatPrice } from "@/utils/HelperFunctions/FormatPrice";
import { useContractCustomEth } from "@/utils/Hooks/useContractCustomEth";
import { PriceContext } from "@/context/PriceContext";
import { useContext } from "react";
import { ScaleLoader } from "react-spinners";
import Image from "next/image";

interface PriceTableDataProps {
    name: string;
    symbol: string;
    contractAddress: string;
}

export default function PriceTableData({ name, symbol, contractAddress }: PriceTableDataProps) {
    const { price, isLoading, error } = useContractCustomEth(contractAddress);
    const { ethereumPrice } = useContext(PriceContext);

    const handleRowClick = (symbol: string) => {
        console.log("symbol", symbol);
    };

    return (
        <div>
            <div className="flex items-center justify-center mt-4 py-5">
                <div className="flex justify-start w-1.5/12 md:w-0.5/12 lg:w-1/12 items-center gap-x-7">
                    <div className="lg:hidden">
                        <Image src={`/icons/nfts/${symbol}.avif`} alt={name} width={30} height={30} />
                    </div>
                    <div className="hidden lg:block">
                        <Image src={`/icons/nfts/${symbol}.avif`} alt={name} width={50} height={50} />
                    </div>
                </div>
                <button
                    onClick={handleRowClick.bind(null, symbol)}
                    className="flex justify-start w-4/12 sm:w-2/12 lg:w-2/12 hover:text-sky-500 transition-colors duration-500 md:text-lg lg:text-xl"
                >
                    <span className="pl-3 text-start font-semibold text-md md:text-lg lg:text-xl">
                        {capitalizeFirstLetter(name)}
                    </span>
                </button>
                <div className="flex flex-col justify-center items-end w-4/12 sm:w-6/12 md:w-5/12 lg:w-2/12 font-semibold text-sm md:text-lg lg:text-xl">
                    <div className="text-sky-300">
                        {!isLoading && !isNaN(parseFloat(price)) ? (
                            parseFloat(price) < 1 ? (
                                `${formatPrice(parseFloat(price), 5)} ETH`
                            ) : (
                                `${formatPrice(parseFloat(price), 2)} ETH`
                            )
                        ) : (
                            <ScaleLoader height={25} width={2} loading={true} color={"rgb(125 211 252)"} />
                        )}
                    </div>
                    <div className="text-sky-200">
                        {!isLoading && !isNaN(parseFloat(price)) ? (
                            parseFloat(price) * ethereumPrice < 1 ? (
                                `$${formatPrice(parseFloat(price) * ethereumPrice, 5)}`
                            ) : (
                                `$${formatPrice(parseFloat(price) * ethereumPrice, 2)}`
                            )
                        ) : (
                            <ScaleLoader height={25} width={2} loading={true} color={"rgb(186 230 253)"} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
