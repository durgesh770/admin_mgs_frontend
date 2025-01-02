"use client";
//react
import React from "react";
import ReportCard from "../../ReportCard";
import Top_2_Bookable_Days_Table from "./Table";

//hook
import { useAppointmentReportFilter, useMostBookableDays } from "@/hooks/Reports";


function Top_2_Bookable_Days() {
  const { days, setParams } = useMostBookableDays();
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
        HandleResetFilter={HandleResetFilter}
        filter={filter}
        title={"Top 2 Bookable Days "}
        TableComponent={<Top_2_Bookable_Days_Table days={days} />}
      />
    </div>
  );
}

export default Top_2_Bookable_Days;
