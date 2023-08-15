"use client";
import { useContext } from "react";
import { PriceContext } from "@/context/PriceContext";
import { CryptoCurrencyFeeds } from "@/utils/ContractRepository/Ethereum/Contracts";

export default function DetailedInfo() {
    const { selectedRow, prices } = useContext(PriceContext);

    const feed = CryptoCurrencyFeeds[selectedRow as keyof typeof CryptoCurrencyFeeds];

    return (
        <div>
            <div className="flex items-center justify-center">
                Price Feed Contract Address: {feed ? feed.address : "Address not found"}
            </div>
            <div className="flex items-center justify-center">
                Time Last Updated: {prices[selectedRow] ? prices[selectedRow].updateTime : "Time not found"}
            </div>
        </div>
    );
}
