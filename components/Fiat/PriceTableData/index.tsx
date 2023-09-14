"use client";
import { useContractCustomUsd } from "@/utils/Hooks/useContractCustomUsd";
import { capitalizeFirstLetter } from "@/utils/HelperFunctions/CapitalizeFirstLetter";
import { formatPrice } from "@/utils/HelperFunctions/FormatPrice";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";

interface PriceTableDataProps {
  name: string;
  symbol: string;
  contractAddress: string;
}

export default function PriceTableData({ name, symbol, contractAddress }: PriceTableDataProps) {
  const { price, isLoading, error } = useContractCustomUsd(contractAddress);

  const handleRowClick = (symbol: string) => {
    console.log("symbol", symbol);
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-4 py-5">
        <div className="flex justify-start w-4/12 md:w-2/12 lg:w-1/12 items-center gap-x-7">
          <div className="lg:hidden">
            <Image src={`/icons/tokens/usdc.svg`} alt={name} width={30} height={30} />
          </div>
          <div className="hidden lg:block">
            <Image src={`/icons/tokens/usdc.svg`} alt={name} width={50} height={50} />
          </div>
          <button
            onClick={handleRowClick.bind(null, symbol)}
            className="flex justify-start w-3/12 hover:text-sky-500 transition-colors duration-500 md:text-lg lg:text-xl"
          >
            <div className="flex gap-3 lg:gap-5 items-baseline">
              <span className="font-semibold text-md md:text-lg lg:text-xl">{capitalizeFirstLetter(name)}</span>
              <span className="text-sm md:text-lg lg:text-xl">{symbol.toUpperCase()}</span>
            </div>
          </button>
        </div>
        <div className="flex flex-col justify-center items-end w-5.5/12 lg:w-4/12 font-semibold text-sm md:text-lg lg:text-xl">
          <div className="text-sky-300">
            {!isLoading && !isNaN(parseFloat(price)) ? (
              parseFloat(price) < 1 ? (
                `$${formatPrice(parseFloat(price), 5)} USD`
              ) : (
                `$${formatPrice(parseFloat(price), 3)} USD`
              )
            ) : (
              <ScaleLoader height={25} width={2} loading={true} color={"rgb(125 211 252)"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
