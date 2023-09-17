"use client";
import Image from "next/image";
import FinancialChart from "@/components/AssetPage/ChartComponent/FinancialChart";
import Loader from "@/components/Loader/Loader";
import { useContext, useEffect } from "react";
import { AssetContext } from "@/context/AssetContext";

export default function ChartComponent({ asset }: { asset: string }) {
  const { isLoading, setSelectedAsset } = useContext(AssetContext);
  useEffect(() => {
    setSelectedAsset(asset);
  }, []);

  return (
    <div className="flex">
      <div className="flex gap-7 border-2 items-center">
        <Image src={`/icons/coins/${asset}.svg`} alt={asset} width={125} height={125} />
        <h1 className="text-3xl">{asset.toUpperCase()}</h1>
      </div>
      <div className="flex border-2">{isLoading ? <Loader asset={asset} /> : <FinancialChart />}</div>
    </div>
  );
}
