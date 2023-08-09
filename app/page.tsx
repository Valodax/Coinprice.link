import { CryptoCurrencyFeeds, SpecialFeeds } from "@/utils/ContractRepository/Ethereum/Contracts";
import PriceFeed from "@/components/PriceFeed";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {Object.entries(CryptoCurrencyFeeds).map(([symbol, { name, address }]) => (
                    <PriceFeed key={symbol} name={name} symbol={symbol} contractAddress={address} />
                ))}
            </main>
            <Footer />
        </div>
    );
}
