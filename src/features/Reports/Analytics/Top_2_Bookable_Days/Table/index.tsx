"use client";
import React from "react";
import DynamicTable from "@/components/ui/Table";
import { TableRow } from "@/interface/Reports";

const Top_2_Bookable_Days_Table = ({days}:any) => {
  let tableFormat: TableRow[] = days.map((item:any, index:number) => ({
    Rank: {
      type: "custom",
      bold: false,
      value: (index + 1).toString(),
    },
    Service: {
      type: "custom",
      bold: false,
      value: item.weekday,
    },
    Total: {
      type: "custom",
      bold: false,
      value: item.count.toString(),
    },
  }));

  return (
    <>
      <div>
        <DynamicTable columns={columns} data={tableFormat} />
      </div>
    </>
  );
};

const columns = ["Rank", "Service", "Total"];

export default Top_2_Bookable_Days_Table;
