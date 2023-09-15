import PriceTable from "@/components/Coins/PriceTable";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow">
        <PriceTable />
      </main>
    </div>
  );
}
