// react
import React, { useState } from "react";
// components
import Switch from "@/components/ui/Switch";
import { LineChart } from "@/components/ui/LineChart/LineChart";
import ChartFilterFeature from "../ChartFilterFeature";
// custom hooks
import {
  useGetBookingRevenue,
  useGetRevenueChart,
} from "@/hooks/Accounts/Revenue";
// utils
import {
  formateSalesChartData,
} from "@/utils/functions";
import ReportTable from "@/components/ui/Report/RevenueReport/ReportTable";
import PaginationFeature from "@/features/Appointments/PaginationFeature/PaginationFeature";
import SimpleAreaChart from "@/components/ui/SimpleAreaChart/SimpleAreaChart";

const BookingRevenueFeature = () => {
  // integration hooks
  const { chart, setParams } = useGetRevenueChart();
  const { revenue, setPage } = useGetBookingRevenue();

  // state
  const [view, setView] = useState(false);
  // filter state for chart
  const [filter, setFilter] = useState("Monthly");

  // chart data
  const chartData =
    filter == "Monthly"
      ? formateSalesChartData(chart, "monthly", "Revenue")
      : formateSalesChartData(chart, "other", "Revenue");

  return (
    <>
      <div className="flex items-center justify-start pb-4 break-words container-sub md:px-0 text-[--brand-color] pl-1 my-3 ">
        <h4 className="mulish">TABULAR VIEW</h4>
        {/* switch */}
        <div className="mx-5">
          <Switch onChange={() => setView(!view)} />
        </div>
        <h4 className="mulish">CHART VIEW</h4>
      </div>

      {/* table and chart  */}
      {!view ? (
        <>
          <div className="">
            <ReportTable rows={revenue.results} />
            <PaginationFeature
              totalPage={revenue.totalPages}
              setPage={setPage}
            />
          </div>
        </>
      ) : (
        <div className="">
          <ChartFilterFeature
            setParams={setParams}
            filter={filter}
            setFilter={setFilter}
          />
          <div className="mt-12" >
            <SimpleAreaChart data={chartData} type={"Revenue"} />
          </div>
        </div>
      )}
    </>
  );
};

export default BookingRevenueFeature;
