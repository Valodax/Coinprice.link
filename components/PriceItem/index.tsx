"use client";
import { useEffect } from "react";
import { useContractCustomUsd } from "@/utils/Hooks/useContractCustomUsd";

export const PriceItem: React.FC<{
    contractAddress: string;
    coin: string;
    updatePrices: (
        coin: string,
        price: string,
        updateTime: string,
        percentage: number | null,
        isLoading: boolean,
        isPercentageLoading: boolean
    ) => void;
}> = ({ contractAddress, coin, updatePrices }) => {
    const { price, percentage, updateTime, isLoading, isPercentageLoading, error } =
        useContractCustomUsd(contractAddress);

    useEffect(() => {
        if (price) {
            updatePrices(coin, price, updateTime, percentage, isLoading, isPercentageLoading);
        }
        if (error) {
            console.log(error);
        }
    }, [price, percentage]);

    return null;
};
