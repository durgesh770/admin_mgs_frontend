// react
import React, { useState } from "react";
// component
import ChartFilterFeature from "../ChartFilterFeature";
import Switch from "@/components/ui/Switch";
import ReportTable from "@/components/ui/Report/RevenueReport/ReportTable";
import PaginationFeature from "@/features/Appointments/PaginationFeature/PaginationFeature";
// hooks
import {
  useGetBookingExpense,
  useGetExpenseChart,
} from "@/hooks/Accounts/Expense";
// utils
import { formateSalesChartData } from "@/utils/functions";
import SimpleAreaChart from "@/components/ui/SimpleAreaChart/SimpleAreaChart";

const BookingExpenseFeature = () => {
  // integration custom hook
  const { chart, setParams } = useGetExpenseChart();
  const { revenue, setPage } = useGetBookingExpense();
  // state
  const [view, setView] = useState(false);
  // filter state for chart
  const [filter, setFilter] = useState("Monthly");

  const chartData =
    filter == "Monthly"
      ? formateSalesChartData(chart, "monthly", "Expense")
      : formateSalesChartData(chart, "other", "Expense");

  return (
    <>
      <div className="flex items-center justify-start pb-4 break-words container-sub md:px-0 text-[--brand-color] pl-1 my-3">
        <h4 className="mulish">TABULAR VIEW</h4>
        {/* switch  */}
        <div className="mx-5">
          <Switch onChange={() => setView(!view)} />
        </div>
        <h4 className="mulish">CHART VIEW</h4>
      </div>

      {/* table and chart  */}
      {!view ? (
        <div className="">
          <ReportTable rows={revenue.results} />
          <PaginationFeature totalPage={revenue.totalPages} setPage={setPage} />
        </div>
      ) : (
        <div className="">
          <ChartFilterFeature
            setParams={setParams}
            filter={filter}
            setFilter={setFilter}
          />
          <div className="mt-12">
            <SimpleAreaChart data={chartData} type={"Expense"} />
          </div>
        </div>
      )}
    </>
  );
};

export default BookingExpenseFeature;
