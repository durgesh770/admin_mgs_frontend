import React, { useState } from "react";
//hook
import { useGetExpenseRevenue, useGetExpenseRevenueChart } from "@/hooks/Accounts/Accounts";
//utils
import {
  ComposeChartFormateData,
} from "@/utils/functions";
//feature
import ChartFilterFeature from "@/features/Reports/RevenueReportfeatures/ChartFilterFeature";
import ComposedChartUI from "../../ComposedChart/ComposedChart";

const Graph = () => {
  const { data, setParams } = useGetExpenseRevenueChart();
  // filter state for chart
  const [filter, setFilter] = useState("Monthly");

  const chartData =
    filter == "Monthly"
      ? ComposeChartFormateData(data.results, "monthly")
      : ComposeChartFormateData(data.results, "other");

  return (
    <>
      <div className="m-auto pb-6 bg-[--brand-white-color] mt-4">
        <ChartFilterFeature
          setParams={setParams}
          filter={filter}
          setFilter={setFilter}
        />
        <div className="m-auto mt-16">
          <ComposedChartUI data={chartData} />
        </div>
      </div>
    </>
  );
};
export default Graph;
