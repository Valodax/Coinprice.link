"use client";

import { CryptoNFTFeeds } from "@/utils/ContractRepository/Ethereum/Contracts";
import PriceTableData from "@/components/NFTs/PriceTableData";
import { useContractCustomUsd } from "@/utils/Hooks/useContractCustomUsd";
import { CryptoCurrencyFeeds } from "@/utils/ContractRepository/Ethereum/Contracts";
import { useState, useEffect } from "react";

export default function PriceTable() {
    const [floatEthPrice, setFloatEthPrice] = useState(0);
    const {
        price: ethPrice,
        isLoading: ethIsLoading,
        error: ethError,
    } = useContractCustomUsd(CryptoCurrencyFeeds.eth.address);

    useEffect(() => {
        if (ethPrice) {
            setFloatEthPrice(parseFloat(ethPrice));
        }
    }, [ethPrice]);

    return (
        <div>
            <div className="flex items-center justify-center lg:gap-10">
                <div className="flex items-center justify-start w-2/12 lg:w-1/12 text-xs lg:text-lg">Image</div>
                <div className="flex items-center justify-start w-3/12 lg:w-1/12 text-xs lg:text-lg">Name</div>
                <div className="flex items-center justify-end w-4/12 lg:w-2/12 text-xs lg:text-lg">
                    Floor Price (USD)
                </div>
            </div>
            {Object.entries(CryptoNFTFeeds).map(([symbol, { name, address }]) => (
                <PriceTableData
                    key={symbol}
                    name={name}
                    symbol={symbol}
                    contractAddress={address}
                    ethPrice={floatEthPrice}
                />
            ))}
        </div>
    );
}
