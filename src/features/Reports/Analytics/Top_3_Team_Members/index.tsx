"use client";
//react
import React from "react";

import ReportCard from "../../ReportCard";
import Top_3_Team_Members_Table from "./Table";

//hook
import { useAppointmentReportFilter, useTopMembers } from "@/hooks/Reports";

function Top_3_Team_Members() {
  const { members, setParams } = useTopMembers();
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
        title={"Top 5 Team Members "}
        TableComponent={<Top_3_Team_Members_Table members={members} />}
      />
    </div>
  );
}

export default Top_3_Team_Members;
