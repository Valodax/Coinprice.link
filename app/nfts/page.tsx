import NFTPriceTable from "@/components/NFTs/PriceTable";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <main className="flex-grow">
                <NFTPriceTable />
            </main>
        </div>
    );
}
