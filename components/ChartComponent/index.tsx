"use client";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { useWindowWidth } from "@/context/WindowContext";
import React from "react";
import { ScaleLoader } from "react-spinners";

type ChartData = {
  round: number;
  value: number;
}[];

interface ChartComponentProps {
  data: ChartData;
}

const COLORS = {
  greenStroke: "rgb(74 222 128)",
  greenFill: "rgb(74 222 128)", //rgb(34 197 94)
  redStroke: "rgb(248 113 113)",
  redFill: "rgb(248 113 113)", //rgb(239 68 68)
  loader: "rgb(125 211 252)",
};

const ChartComponent = ({ data }: ChartComponentProps) => {
  const windowWidth = useWindowWidth();

  const chartColor = data[0].value < data[data.length - 1].value ? COLORS.greenStroke : COLORS.redStroke;

  const dataValues = data.map((entry) => entry.value);

  return (
    <>
      {data.length > 0 ? (
        <Sparklines data={dataValues} svgWidth={windowWidth * 0.14} svgHeight={45}>
          <SparklinesLine color={chartColor} style={{ animation: "colorfade 5s" }} />
        </Sparklines>
      ) : (
        <ScaleLoader height={25} width={2} loading={true} color={COLORS.loader} />
      )}
    </>
  );
};

export default React.memo(ChartComponent);
