import { Feeds } from "@/utils/ContractRepository/Ethereum/Contracts";
import PriceFeed from "@/components/PriceFeed";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <>
            <Header />
            <main className="flex flex-col min-h-screen">
                {Object.entries(Feeds).map(([feed, contractAddress]) => (
                    <PriceFeed key={feed} feed={feed} contractAddress={contractAddress} />
                ))}
            </main>
            <Footer />
        </>
    );
}
