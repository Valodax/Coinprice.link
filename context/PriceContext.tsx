"use client";

import React, { createContext, useState, useEffect } from "react";
import { CryptoCurrencyFeeds } from "@/utils/ContractRepository/Ethereum/Contracts";
import { PriceItem } from "@/components/PriceItem";

interface PriceData {
    [key: string]: {
        price: string;
        percentage: number | null;
        isLoading: boolean;
        isPercentageLoading: boolean;
    };
}

interface PriceContextData {
    prices: PriceData;
    setPrices: React.Dispatch<React.SetStateAction<PriceData>>;
    ethereumPrice: number;
}

export const PriceContext = createContext<PriceContextData>({
    prices: {},
    setPrices: () => {},
    ethereumPrice: 0,
});

export const PriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [prices, setPrices] = useState<PriceData>({});
    const [ethereumPrice, setEthereumPrice] = useState<number>(0);

    const updatePrices = (
        coin: string,
        price: string,
        percentage: number | null,
        isLoading: boolean,
        isPercentageLoading: boolean
    ) => {
        setPrices((prevPrices) => ({ ...prevPrices, [coin]: { price, percentage, isLoading, isPercentageLoading } }));
        if (coin === "eth") {
            setEthereumPrice(Number(price));
        }
        console.log(`updating ${coin} price`);
    };

    const contractAddresses = Object.values(CryptoCurrencyFeeds).map((feed) => feed.address);

    return (
        <PriceContext.Provider value={{ prices, setPrices, ethereumPrice }}>
            {children}
            {contractAddresses.map((address, index) => (
                <PriceItem
                    key={address}
                    contractAddress={address}
                    coin={Object.keys(CryptoCurrencyFeeds)[index]}
                    updatePrices={updatePrices}
                />
            ))}
        </PriceContext.Provider>
    );
};
