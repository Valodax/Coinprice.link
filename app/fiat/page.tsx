import PriceTable from "@/components/Prices/PriceTableHeader";
export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <main className="flex-grow">
        <PriceTable isFiat={true} />
      </main>
    </div>
  );
}
