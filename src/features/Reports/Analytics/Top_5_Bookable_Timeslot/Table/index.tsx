"use client";
//component
import DynamicTable from "@/components/ui/Table";
import { TableRow } from "@/interface/Reports";
//utils
import { formatTime } from "@/utils/tools";
//react
import React from "react";

const Top_5_Bookable_Timeslot_Table = ({ timeslots }: any) => {
  let tableFormat: TableRow[] = timeslots.map((item: any, index: number) => ({
    Rank: {
      type: "custom",
      bold: false,
      value: (index + 1).toString(),
    },
    Service: {
      type: "custom",
      bold: false,
      value: (
        <span>
          {formatTime(item._id.start_time)} - {formatTime(item._id.end_time)}
        </span>
      ),
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

export default Top_5_Bookable_Timeslot_Table;
