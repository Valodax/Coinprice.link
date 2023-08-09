"use client";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { aggregatorV3InterfaceABI } from "@/utils/ContractAbis/AggregatorV3Abi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { capitalizeFirstLetter } from "@/utils/HelperFunctions/CapitalizeFirstLetter";
import Image from "next/image";

interface PriceFeedProps {
    name: string;
    symbol: string;
    contractAddress: string;
}

export default function PriceFeed({ name, symbol, contractAddress }: PriceFeedProps) {
    const [price, setPrice] = useState("");

    const {
        contract: priceFeed,
        isLoading: isContractLoading,
        error: contractError,
    } = useContract(contractAddress, aggregatorV3InterfaceABI);

    if (contractError) {
        console.log("contract error!", contractError);
    }

    const formatPrice = (price: string, decimalPlaces: number) => {
        const [integerPart, decimalPart] = parseFloat(price).toFixed(decimalPlaces).split(".");
        return `${Number(integerPart).toLocaleString()}.${decimalPart}`;
    };

    const {
        data,
        isLoading: isContractReadLoading,
        error: contractReadError,
    } = useContractRead(priceFeed, "latestRoundData");

    if (contractReadError) {
        console.log("contract read error", contractReadError);
    }

    useEffect(() => {
        if (data) {
            let price = ethers.utils.formatUnits(data.answer, 8);
            setPrice(price);
        }
    }, [data]);

    return isContractReadLoading ? (
        <div className="flex items-center justify-center mt-4 space-x-1 space-y-1">Loading...</div>
    ) : (
        <div className="flex items-center justify-center mt-4 space-x-1 space-y-1">
            <div className="flex justify-center w-4/12"></div>
            <div className="flex justify-center w-1/12">
                <Image src={`/icons/tokens/${symbol}.svg`} alt={name} width={50} height={50} />
            </div>
            <div className="flex justify-center w-1/12 font-bold text-2xl">{symbol.toUpperCase()}</div>
            <div className="flex justify-center w-1/12 font-semibold text-2xl">{capitalizeFirstLetter(name)}</div>
            <div className="flex justify-center w-3/12 font-semibold text-2xl text-sky-300">
                {parseFloat(price) < 1
                    ? `$${formatPrice(price, 5)}`
                    : parseFloat(price) < 1000000000000
                    ? `$${formatPrice(price, 2)}`
                    : `$${formatPrice((parseFloat(price) / 1000000000000).toString(), 2)}T`}
            </div>
            <div className="flex justify-center w-4/12"></div>
        </div>
    );
}
