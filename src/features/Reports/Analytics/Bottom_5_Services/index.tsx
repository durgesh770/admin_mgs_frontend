"use client";
//react
import React from "react";
import ReportCard from "../../ReportCard";
import Bottom_5_Services_Table from "./Table";

//hook
import { useAppointmentReportFilter, useLowServices } from "@/hooks/Reports";

function Bottom_5_Services() {
  const { services, setParams } = useLowServices();
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
    <ReportCard
      setDateRange={setDateRange}
      dateRange={dateRange}
      setFilter={setFilter}
      HandleResetFilter={HandleResetFilter}
      filter={filter}
      title={"Bottom 5 Services"}
      TableComponent={<Bottom_5_Services_Table services={services} />}
    />
  );
}

export default Bottom_5_Services;
