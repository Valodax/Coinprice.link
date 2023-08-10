import { CryptoCurrencyFeeds } from "@/utils/ContractRepository/Ethereum/Contracts";
import PriceTableData from "@/components/PriceTableData";

export default function PriceTable() {
    return (
        <div className="p-10">
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-start w-1/12">Image</div>
                <div className="flex items-center justify-start w-1/12">Symbol</div>
                <div className="flex items-center justify-start w-1/12">Name</div>
                <div className="flex items-center justify-end w-2/12">Price (USD)</div>
            </div>
            {Object.entries(CryptoCurrencyFeeds).map(([symbol, { name, address }]) => (
                <PriceTableData key={symbol} name={name} symbol={symbol} contractAddress={address} />
            ))}
        </div>
    );
}
