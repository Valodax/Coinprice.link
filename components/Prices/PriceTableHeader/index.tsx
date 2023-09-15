"use client";
import PriceTableData from "@/components/Prices/PriceTableData";
import { useContext } from "react";
import { PriceContext } from "@/context/PriceContext";
import { useWindowWidth } from "@/context/WindowContext";
import { BarLoader } from "react-spinners";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Props {
  isFiat?: boolean;
}

export default function PriceTable({ isFiat }: Props) {
  const { isLoading } = useContext(PriceContext);
  const windowWidth = useWindowWidth();
  const [showSecondLoader, setShowSecondLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondLoader((prevState) => !prevState);
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [showSecondLoader]);

  return (
    <div className="px-2">
      {isLoading ? (
        <div className="flex items-center justify-center gap-x-2 pt-10">
          <div className="flex justify-end items-center w-4/12">
            <Image src={`/icons/coins/grt.svg`} alt={"The Graph"} width={40} height={40} />
          </div>

          <div className={`flex justify-center items-center w-4/12 ${showSecondLoader ? "hidden" : ""}`}>
            <BarLoader loading={true} width={windowWidth * 0.32} speedMultiplier={2} color={"#6747ed"} />
          </div>

          <div
            className={`flex justify-center items-center w-4/12 ${showSecondLoader ? "" : "hidden"}`}
            style={{ transform: "rotate(180deg)" }}
          >
            <BarLoader loading={true} width={windowWidth * 0.32} speedMultiplier={2} color={"#375bd2"} />
          </div>

          <div className="flex justify-start items-center w-4/12">
            <Image src={`/icons/coins/link.svg`} alt={"Chainlink"} width={40} height={40} />
          </div>
        </div>
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
