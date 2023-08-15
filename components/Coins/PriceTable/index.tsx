"use client";
import { CryptoCurrencyFeeds } from "@/utils/ContractRepository/Ethereum/Contracts";
import PriceTableData from "@/components/Coins/PriceTableData";
import React, { useState } from "react";

export default function PriceTable() {
    const [selectedRow, setSelectedRow] = useState<string | null>("");

    const handleRowClick = (symbol: string) => {
        console.log("symbol", symbol);
        setSelectedRow(selectedRow === symbol ? null : symbol);
    };

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-start w-4/12 md:w-2/12 lg:w-2/12 text-sm md:text-lg lg:text-xl">
                    Coin Identifier
                </div>
                <div className="flex items-center justify-end w-4/12 lg:w-2/12 text-sm md:text-lg lg:text-xl">
                    Price (USD)
                </div>
                <div className="flex items-center justify-end w-1.5/12 lg:w-1/12 text-sm md:text-lg lg:text-xl">24h</div>
            </div>
            {Object.entries(CryptoCurrencyFeeds).map(([symbol, { name }]) => (
                <React.Fragment key={symbol}>
                    <PriceTableData key={symbol} name={name} symbol={symbol} onClick={() => handleRowClick(symbol)} />
                    {selectedRow === symbol && (
                        <div className="flex items-center justify-center">{/* ...additional info... */}</div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
