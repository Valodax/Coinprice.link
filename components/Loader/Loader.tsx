"use client";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { useWindowWidth } from "@/context/WindowContext";
import Image from "next/image";

interface Props {
  asset?: string;
}

export default function Loader({ asset }: Props) {
  const [stage, setStage] = useState(0); // [0, 1, 2, 3]
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage((prevStage) => (prevStage < 3 ? prevStage + 1 : 0));
    }, 2000);
    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className="flex items-center justify-center gap-x-2 pt-10">
      {/* Image */}
      <div className={`flex justify-end items-center ${asset ? "w-2/12" : "w-4/12"}`}>
        <Image src={`/icons/coins/grt.svg`} alt={"The Graph"} width={40} height={40} />
      </div>

      <div
        className={`flex justify-center items-center ${asset ? "w-2/12" : "w-3/12"} ${
          asset ? (stage === 0 || stage === 2 ? "w-2/12" : "hidden") : stage === 0 || stage === 2 ? "" : "hidden"
        }`}
      >
        <BarLoader loading={true} width={windowWidth * 0.32} speedMultiplier={1} color={"#6747ed"} />
      </div>

      <div
        className={`flex justify-center items-center ${asset ? "w-2/12" : "w-3/12"} ${
          asset ? (stage === 1 || stage === 3 ? "w-2/12" : "hidden") : stage === 1 || stage === 3 ? "" : "hidden"
        }`}
        style={{ transform: "rotate(180deg)" }}
      >
        <BarLoader loading={true} width={windowWidth * 0.32} speedMultiplier={1} color={"#375bd2"} />
      </div>

      {/* {asset && <div className={`${stage === 0 || stage === 3 ? "hidden" : "w-2/12"}`}></div>} */}

      {/* Image */}
      <div className={`flex ${asset ? "justify-center" : "justify-start w-4/12"} items-center`}>
        <Image src={`/icons/coins/link.svg`} alt={"Chainlink"} width={40} height={40} />
      </div>

      {asset ? (
        <>
          {/* <div className={`${stage === 1 || stage === 2 ? "hidden" : "w-2/12"}`}></div> */}

          <div className={`flex justify-center items-center ${stage === 0 || stage === 2 ? "w-2/12" : "hidden"}`}>
            <BarLoader loading={true} width={windowWidth * 0.32} speedMultiplier={1} color={"#375bd2"} />
          </div>

          <div
            className={`flex justify-center items-center ${stage === 1 || stage === 3 ? "w-2/12" : "hidden"}`}
            style={{ transform: "rotate(180deg)" }}
          >
            <BarLoader loading={true} width={windowWidth * 0.32} speedMultiplier={1} color={"#d1d5db"} />
          </div>

          {/* Image */}
          <div className="flex justify-start items-center w-2/12">
            <Image src={`/icons/coins/${asset}.svg`} alt={"Chainlink"} width={40} height={40} />
          </div>
        </>
      ) : null}
    </div>
  );
}
