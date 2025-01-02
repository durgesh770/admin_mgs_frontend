"use client";
//react
import React from "react";
import ReportCard from "../../ReportCard";
import Top_5_Customers_Table from "./Table";

//hook
import { useAppointmentReportFilter, useTopCustomer } from "@/hooks/Reports";


function Top_5_Customers() {
  const { customers, setParams } = useTopCustomer();
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
        title={"Top 5 Customers"}
        HandleResetFilter={HandleResetFilter}
        TableComponent={<Top_5_Customers_Table customers={customers} />}
      />
    </div>
  );
}

export default Top_5_Customers;
