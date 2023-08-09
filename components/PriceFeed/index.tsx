"use client";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { aggregatorV3InterfaceABI } from "@/utils/ContractAbis/AggregatorV3Abi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

interface PriceFeedProps {
    feed: string;
    contractAddress: string;
}

export default function PriceFeed({ feed, contractAddress }: PriceFeedProps) {
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

    return (
        <div className="flex items-center justify-center mt-4 space-x-6">
            {isContractReadLoading
                ? "Loading..."
                : parseFloat(price) < 1
                ? `${feed}: $${formatPrice(price, 5)}`
                : parseFloat(price) < 1000000000000
                ? `${feed}: $${formatPrice(price, 2)}`
                : `${feed}: $${formatPrice((parseFloat(price) / 1000000000000).toString(), 2)}T`}
        </div>
    );
}
