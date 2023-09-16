import DetailedInfo from "@/components/AssetPage/DetailedInfo";
import ChartComponent from "@/components/AssetPage/ChartComponent";
import Image from "next/image";

export default function Page({ params }: { params: { asset: string } }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow">
        <div className="flex justify-center">
          <ChartComponent asset={params.asset} />
        </div>
        <div className="border-2">
          <DetailedInfo />
        </div>
      </main>
    </div>
  );
}
