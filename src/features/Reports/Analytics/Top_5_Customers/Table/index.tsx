"use client";
import DynamicTable from "@/components/ui/Table";
import { TableRow } from "@/interface/Reports";
import React from "react";

const Top_5_Customers_Table = ({ customers }: any) => {
  let tableFormat: TableRow[] = customers.map((item: any, index: number) => ({
    Rank: {
      type: "custom",
      bold: false,
      value: (index + 1).toString(),
    },
    name: item.name,
    email: item.email,
  }));

  return (
    <>
      <div>
        <DynamicTable columns={columns} data={tableFormat} />
      </div>
    </>
  );
};

const columns = ["Rank", "Name", "Total"];

export default Top_5_Customers_Table;
