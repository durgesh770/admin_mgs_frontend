"use client";
import React, { useState } from "react";
import DynamicTable from "@/components/ui/Table";
import { TableRow } from "@/interface/Reports";
import PieActiveArc from "@/components/ui/PieChart/PieChart";
import Switch from "@/components/ui/Switch";
import { formateDataForPieChart } from "@/utils/functions";

const Bottom_5_Services_Table = ({ services }: any) => {
  const [view, setView] = useState(false);
  const handleSwitchChange = () => {
    setView(!view);
  };
  const palette = ["#f4a48c", "#C1846E", "#F7DED7", "#E69C81", "#F7D0BC"];

  let tableFormat: TableRow[] = services.map((item: any, index: number) => ({
    Rank: {
      type: "custom",
      bold: false,
      value: (index + 1).toString(),
    },
    Service: {
      type: "custom",
      bold: false,
      value: item.service.serviceName,
    },
    Total: {
      type: "custom",
      bold: false,
      value: item.count.toString(),
    },
  }));

  return (
    <>
      <div className="flex items-center justify-start py-2 break-words container-sub text-[--brand-color]">
        <h4 className="mulish ">TABULAR VIEW</h4>
        <div className="mx-5">
          <Switch onChange={handleSwitchChange} />
        </div>
        <h4 className="mulish">CHART VIEW</h4>
      </div>

      {!view && <DynamicTable columns={columns} data={tableFormat} />}
      {view && (
        <PieActiveArc
          palette={palette}
          data={formateDataForPieChart(services)}
        />
      )}
    </>
  );
};

const columns = ["Rank", "Service", "Total"];

export default Bottom_5_Services_Table;