import PriceTableData from "@/components/Coins/PriceTableData";

export default function PriceTable() {
  return (
    <div className="px-2">
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-start w-3/12 md:w-2/12 lg:w-2/12 text-sm md:text-lg lg:text-xl">
          Coin Identifier
        </div>
        <div className="flex items-center justify-end w-3/12 lg:w-2/12 text-sm md:text-lg lg:text-xl">Price (USD)</div>
        <div className="flex items-center justify-end w-2/12 lg:w-1/12 text-sm md:text-lg lg:text-xl">24h</div>
        <div className="hidden lg:flex items-center justify-end lg:w-1/12 text-sm md:text-lg lg:text-xl">7d</div>
        <div className="flex items-center justify-end w-3/12 lg:w-2/12 text-sm md:text-lg lg:text-xl">Last 7 Days</div>
      </div>
      <PriceTableData />
    </div>
  );
}
