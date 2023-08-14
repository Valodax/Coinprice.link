import { Get24HourPriceChangePercentage } from "../HelperFunctions/Get24HourPriceChangePercentage";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { aggregatorV3InterfaceABI } from "@/utils/ContractAbis/AggregatorV3Abi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export const useContractCustomUsd = (contractAddress: string) => {
    const [price, setPrice] = useState("");
    const [prevPrice, setPrevPrice] = useState(() => {
        if (typeof window !== "undefined") {
            const prevPrice = localStorage.getItem("prevPrice");
            if (prevPrice) {
                return parseFloat(prevPrice);
            }
        }
        return "";
    });
    const [percentage, setPercentage] = useState<number | null>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isPercentageLoading, setIsPercentageLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const {
        contract: priceFeed,
        isLoading: isContractLoading,
        error: contractError,
    } = useContract(contractAddress, aggregatorV3InterfaceABI);

    const {
        data,
        isLoading: isContractReadLoading,
        error: contractReadError,
    } = useContractRead(priceFeed, "latestRoundData");

    const calculateChange = async (data: any) => {
        const phaseId = BigInt(data.roundId) >> BigInt(64);
        const aggregatorRoundId = BigInt(data.roundId) & BigInt("0xFFFFFFFFFFFFFFFF");

        setIsPercentageLoading(true);
        const percentage = await Get24HourPriceChangePercentage(priceFeed, phaseId, aggregatorRoundId);
        setPercentage(percentage);
        setIsPercentageLoading(false);
    };

    useEffect(() => {
        if (data) {
            let newPrice = ethers.utils.formatUnits(data.answer, 8);
            console.log(newPrice, prevPrice);

            if (newPrice !== prevPrice) {
                setPrice(newPrice);
                console.log("running calculate change");
                calculateChange(data);
                setPrevPrice(newPrice);
                if (typeof window !== "undefined") {
                    console.log("setting local storage");
                    localStorage.setItem("prevPrice", newPrice);
                }
            } else {
                // if prices are same, still set loading states to false
                setIsPercentageLoading(false);
            }
        }

        // sets loading state to true if either is loading
        setIsLoading(isContractLoading || isContractReadLoading);

        // sets loading state to false if both are not loading
        if (!isContractLoading && !isContractReadLoading) {
            setIsLoading(false);
        }

        setError(
            contractError instanceof Error
                ? contractError
                : contractReadError instanceof Error
                ? contractReadError
                : null
        );
    }, [data, isContractLoading, isContractReadLoading, contractError, contractReadError]);

    return { price, percentage, isLoading, isPercentageLoading, error };
};
