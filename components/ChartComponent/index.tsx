"use client";
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, ReferenceLine } from "recharts";
import { ScaleLoader } from "react-spinners";
import { useWindowWidth } from "@/context/WindowContext";
import React from "react";

type ChartData = {
  round: number;
  value: number;
}[];

interface ChartComponentProps {
  data: ChartData;
}

const COLORS = {
  greenStroke: "rgb(74 222 128)",
  greenFill: "rgb(34 197 94)",
  redStroke: "rgb(248 113 113)",
  redFill: "rgb(239 68 68)",
  loader: "rgb(125 211 252)",
};

const ChartComponent: React.FC<ChartComponentProps> = ({ data }: ChartComponentProps) => {
  const windowWidth = useWindowWidth();

  const chartStroke = data[0].value < data[data.length - 1].value ? COLORS.greenStroke : COLORS.redStroke;
  const chartColor = data[0].value < data[data.length - 1].value ? COLORS.greenFill : COLORS.redFill;

  let referenceLines = null;
  if (windowWidth && windowWidth > 1024) {
    referenceLines = data.map((entry, index) => (
      <ReferenceLine key={`line-${index}`} x={entry.round} stroke="rgba(255, 255, 255, 0.3)" strokeDasharray="3 3" />
    ));
  }

  return (
    <ResponsiveContainer width="75%" height={45}>
      {data.length > 0 ? (
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <YAxis domain={["auto", "auto"]} hide={true} />
          <XAxis dataKey="round" tick={false} height={0} />
          {/* {referenceLines} */}
          <Area type="monotone" dataKey="value" stroke={chartStroke} fill={chartColor} />
        </AreaChart>
      ) : (
        <ScaleLoader height={25} width={2} loading={true} color={"rgb(125 211 252)"} />
      )}
    </ResponsiveContainer>
  );
};

export default React.memo(ChartComponent);
