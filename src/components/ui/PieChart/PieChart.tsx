import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieActiveArc({ palette, data }: any) {
  return (
    <>
      <PieChart
        colors={palette}
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={250}
        sx={{ marginLeft:10}}
      />

      <style>
        {`
          .mui-1u0lry5-MuiChartsLegend-root {
            display: none;
          }
        `}
      </style>
    </>
  );
}
