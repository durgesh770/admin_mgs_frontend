import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  labels: string[];
  dataset1Data: any;
  dataset2Data?: any;
  dataLabel2?: any;
  dataLabel1: string;
}

export function LineChart({
  labels,
  dataset1Data,
  dataset2Data,
  dataLabel2,
  dataLabel1,
}: LineChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
      },
    },
  };

  const datasets = [
    {
      label: dataLabel1,
      data: dataset1Data,
      borderColor: "#f59b90",
      backgroundColor: "#f59b90",
    },
  ];

  if (dataset2Data) {
    datasets.push({
      label: dataLabel2,
      data: dataset2Data,
      borderColor: "#F7D0BC",
      backgroundColor: "#F7DED7",
    });
  }

  const data = {
    labels,
    datasets,
  };

  return <Line options={options} data={data} height={160} />;
}
