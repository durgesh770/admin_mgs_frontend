"use client";
//react
import React from "react";
import ReportCard from "../../ReportCard";
import Top_5_Bookable_Timeslot_Table from "./Table";

//hook
import { useMostBookableTimeslots, useAppointmentReportFilter } from "@/hooks/Reports";

function Top_5_Bookable_Timeslot() {
  const { timeslots, setParams } = useMostBookableTimeslots();
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
        HandleResetFilter={HandleResetFilter}
        setFilter={setFilter}
        filter={filter}
        title={"Top 5 Time Slots"}
        TableComponent={<Top_5_Bookable_Timeslot_Table timeslots={timeslots} />}
      />
    </div>
  );
}

export default Top_5_Bookable_Timeslot;
