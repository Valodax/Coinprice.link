import PriceTable from "@/components/Coins/PriceTable";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <PriceTable />
            </main>
        </div>
    );
}
