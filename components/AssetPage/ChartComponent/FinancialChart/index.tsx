"use client";
import PriceTableData from "@/components/Prices/PriceTableData";
import { useContext } from "react";
import { PriceContext } from "@/context/PriceContext";
import { useWindowWidth } from "@/context/WindowContext";
import { BarLoader } from "react-spinners";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function FinancialChart() {
  const windowWidth = useWindowWidth();
  const [showSecondLoader, setShowSecondLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondLoader((prevState) => !prevState);
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [showSecondLoader]);

  return <div className="flex justify-center items-center">PLACEHOLDER</div>;
}
