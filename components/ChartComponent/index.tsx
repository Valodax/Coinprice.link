"use client";

import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, ReferenceLine } from "recharts";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import React from "react";

type ChartData = {
  round: number;
  value: number;
}[];

interface ChartComponentProps {
  data: ChartData; // make data optional
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }: ChartComponentProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const chartStroke = data[0].value < data[data.length - 1].value ? "rgb(74 222 128)" : "rgb(248 113 113)";
  const chartColor = data[0].value < data[data.length - 1].value ? "rgb(34 197 94)" : "rgb(239 68 68)";

  return (
    <ResponsiveContainer width="75%" height={45}>
      {data.length > 0 ? (
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <YAxis domain={["auto", "auto"]} hide={true} />
          <XAxis dataKey="round" tick={false} height={0} />
          {windowWidth > 1024 &&
            data.map((entry, index) => (
              <ReferenceLine
                key={`line-${index}`}
                x={entry.round}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeDasharray="3 3"
              />
            ))}
          <Area type="monotone" dataKey="value" stroke={chartStroke} fill={chartColor} />
        </AreaChart>
      ) : (
        <ScaleLoader height={25} width={2} loading={true} color={"rgb(125 211 252)"} />
      )}
    </ResponsiveContainer>
  );
};

export default ChartComponent;
