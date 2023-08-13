"use client";
import { capitalizeFirstLetter } from "@/utils/HelperFunctions/CapitalizeFirstLetter";
import { formatPrice } from "@/utils/HelperFunctions/FormatPrice";
import { useContractCustomUsd } from "@/utils/Hooks/useContractCustomUsd";
import Image from "next/image";

interface PriceTableDataProps {
    name: string;
    symbol: string;
    contractAddress: string;
}

export default function PriceTableData({ name, symbol, contractAddress }: PriceTableDataProps) {
    const { price, isLoading, error } = useContractCustomUsd(contractAddress);

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
                <div className="flex justify-end w-4/12 lg:w-2/12 font-semibold text-sm md:text-lg lg:text-xl text-sky-300">
                    {!isLoading && !isNaN(parseFloat(price))
                        ? parseFloat(price) < 1
                            ? `$${formatPrice(price, 5)}`
                            : `$${formatPrice(price, 2)}`
                        : "Loading..."}
                </div>
            </div>
        </div>
    );
}
