import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import NFTPriceTable from "@/components/NFTs/PriceTable";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Hero />
            <main className="flex-grow">
                <NFTPriceTable />
            </main>
            <Footer />
        </div>
    );
}
