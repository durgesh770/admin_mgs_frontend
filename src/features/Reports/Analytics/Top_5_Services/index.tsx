"use client";
//react
import React from "react";

import ReportCard from "../../ReportCard";
import Top_5_Services_Table from "./Table";
//hooks
import {
  useAppointmentReportFilter,
  useTopPopularServices,
} from "@/hooks/Reports";//utilis


function Top_5_Services() {
  // integration hook
  const { services, setParams } = useTopPopularServices();
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
        title={"Top 5 Popular Services "}
        TableComponent={<Top_5_Services_Table services={services} />}
      />
    </div>
  );
}

export default Top_5_Services;
