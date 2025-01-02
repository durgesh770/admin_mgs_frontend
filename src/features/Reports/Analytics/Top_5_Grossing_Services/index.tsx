"use client";

import React from "react";
import ReportCard from "../../ReportCard";
import Top_5_Grossing_Services_Table from "./Table";
import {
  useAppointmentReportFilter,
  useGrossingServices,
} from "@/hooks/Reports";

function Top_5_Grossing_Services() {
  // integration hook
  const { gross, setParams } = useGrossingServices();
  // filter hook
  const { setFilter, setDateRange, dateRange, filter } =
    useAppointmentReportFilter(setParams);

  const HandleResetFilter = () => {
    setFilter("none");
    setDateRange({
      from: null,
      to: null,
    });
  };

  return (
    <div>
      <ReportCard
        setDateRange={setDateRange}
        dateRange={dateRange}
        setFilter={setFilter}
        filter={filter}
        HandleResetFilter={HandleResetFilter}
        title={"Top 5 Grossing Services "}
        TableComponent={<Top_5_Grossing_Services_Table gross={gross} />}
      />
    </div>
  );
}

export default Top_5_Grossing_Services;
