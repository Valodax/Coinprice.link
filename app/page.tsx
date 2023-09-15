import PriceTable from "@/components/Prices/PriceTableHeader";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow">
        <PriceTable />
      </main>
    </div>
  );
}
