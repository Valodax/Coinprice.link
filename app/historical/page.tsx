import HistoricalData from "@/components/HistoricalData";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <main className="flex-grow">
                <HistoricalData />
            </main>
        </div>
    );
}
