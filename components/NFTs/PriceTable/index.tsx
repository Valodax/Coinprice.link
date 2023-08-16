"use client";

import { CryptoNFTFeeds } from "@/utils/ContractRepository/Ethereum/Contracts";
import PriceTableData from "@/components/NFTs/PriceTableData";

export default function PriceTable() {
    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-start w-4/12 md:w-2/12 lg:w-2/12 text-sm md:text-lg lg:text-xl">
                    NFT Name
                </div>
                <div className="flex items-center justify-end w-5.5/12 lg:w-3/12 text-sm md:text-lg lg:text-xl">
                    Floor Price (USD)
                </div>
            </div>
            {Object.entries(CryptoNFTFeeds).map(([symbol, { name, address }]) => (
                <PriceTableData key={symbol} name={name} symbol={symbol} contractAddress={address} />
            ))}
        </div>
    );
}
