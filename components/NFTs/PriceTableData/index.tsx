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

    return (
        <div>
            <div className="flex items-center justify-center mt-4 py-5 lg:gap-10">
                <div className="flex justify-start w-2/12 lg:w-1/12">
                    <div className="lg:hidden">
                        <Image src={`/icons/nfts/${symbol}.avif`} alt={name} width={30} height={30} />
                    </div>
                    <div className="hidden lg:block">
                        <Image src={`/icons/nfts/${symbol}.avif`} alt={name} width={50} height={50} />
                    </div>
                </div>
                <div className="flex justify-start w-3/12 lg:w-2/12 font-semibold text-sm md:text-lg lg:text-xl">
                    {capitalizeFirstLetter(name)}
                </div>
                <div className="flex flex-col justify-center items-end w-4/12 lg:w-2/12 font-semibold text-sm md:text-lg lg:text-xl">
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
