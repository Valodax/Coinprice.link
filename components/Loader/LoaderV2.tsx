"use client";
import { BarLoader } from "react-spinners";
import { useWindowWidth } from "@/context/WindowContext";
import Image from "next/image";

interface Props {
  asset?: string;
}

export default function LoaderV2({ asset }: Props) {
  const windowWidth = useWindowWidth();

  return (
    <div className="flex items-center justify-center gap-x-2 pt-10">
      {/* Image */}
      <div className={`flex ${asset ? "w-2/12" : "w-4/12"} justify-end items-center`}>
        <Image src={`/icons/coins/grt.svg`} alt={"The Graph"} width={40} height={40} />
      </div>

      <div className={`flex ${asset ? "w-2/12" : "w-3/12"} flex-col justify-center items-center gap-y-2`}>
        <div className="flex w-full">
          <BarLoader loading={true} width={windowWidth * 0.32} speedMultiplier={1} color={"#6747ed"} />
        </div>

        <div className="flex w-full" style={{ transform: "rotate(180deg)" }}>
          <BarLoader loading={true} width={windowWidth * 0.32} speedMultiplier={1} color={"#375bd2"} />
        </div>
      </div>

      {/* Image */}
      <div className={`flex ${asset ? "justify-center" : "justify-start w-4/12"} items-center`}>
        <Image src={`/icons/coins/link.svg`} alt={"Chainlink"} width={40} height={40} />
      </div>

      {asset ? (
        <>
          <div className="flex flex-col w-2/12 justify-center items-center gap-y-2">
            <div className="flex w-full">
              <BarLoader loading={true} width={windowWidth * 0.32} speedMultiplier={1} color={"#375bd2"} />
            </div>

            <div className="flex w-full" style={{ transform: "rotate(180deg)" }}>
              <BarLoader loading={true} width={windowWidth * 0.32} speedMultiplier={1} color={"#d1d5db"} />
            </div>
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
