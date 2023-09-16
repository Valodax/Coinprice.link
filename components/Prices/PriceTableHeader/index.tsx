"use client";
import PriceTableData from "@/components/Prices/PriceTableData";
import { useContext } from "react";
import { PriceContext } from "@/context/PriceContext";
import Loader from "@/components/Loader/Loader";
import LoaderV2 from "@/components/Loader/LoaderV2";

interface Props {
  isFiat?: boolean;
}

export default function PriceTable({ isFiat }: Props) {
  const { isLoading } = useContext(PriceContext);

  return (
    <div className="px-2">
      {isLoading ? (
        //<LoaderV2 />
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-start w-3/12 md:w-2/12 lg:w-2/12 text-sm md:text-lg lg:text-xl">
              {!isFiat ? "Coin Identifier" : "Fiat Currency"}
            </div>
            <div className="flex items-center justify-end w-3/12 lg:w-2/12 text-sm md:text-lg lg:text-xl">
              Price (USD)
            </div>
            <div className="flex items-center justify-end w-2/12 lg:w-1/12 text-sm md:text-lg lg:text-xl">24h</div>
            <div className="hidden lg:flex items-center justify-end lg:w-1/12 text-sm md:text-lg lg:text-xl">7d</div>
            <div className="flex items-center justify-end w-3/12 lg:w-2/12 text-sm md:text-lg lg:text-xl">
              Last 7 Days
            </div>
          </div>
          <PriceTableData isFiat={isFiat} />
        </>
      )}
    </div>
  );
}
