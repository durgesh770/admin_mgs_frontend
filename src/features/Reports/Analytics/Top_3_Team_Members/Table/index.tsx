"use client";
import PieActiveArc from "@/components/ui/PieChart/PieChart";
import Switch from "@/components/ui/Switch";
//component
import DynamicTable from "@/components/ui/Table";
import { TableRow } from "@/interface/Reports";
import { formateDataForPieChartInAccountPage } from "@/utils/functions";
//react
import React, { useState } from "react";

const Top_3_Team_Members_Table = ({ members, isChart }: any) => {
  const [view, setView] = useState(false);
  const handleSwitchChange = () => {
    setView(!view);
  };
  const palette = ["#f4a48c", "#C1846E", "#F7DED7", "#E69C81", "#F7D0BC"];

  let tableFormat: TableRow[] = members.map((item: any, index: number) => ({
    Rank: {
      type: "custom",
      bold: false,
      value: (index + 1).toString(),
    },
    Name: {
      type: "custom",
      bold: false,
      value: item.teamMember.teamMemberName,
    },
    Total: {
      type: "custom",
      bold: false,
      value: item.count.toString(),
    },
  }));

  return (
    <>
      {!isChart && (
        <div className="flex items-center justify-start py-2 break-words container-sub text-[--brand-color]">
          <h4 className="mulish ">TABULAR VIEW</h4>
          <div className="mx-5">
            <Switch onChange={handleSwitchChange} />
          </div>
          <h4 className="mulish">CHART VIEW</h4>
        </div>
      )}
      {!view && <DynamicTable columns={columns} data={tableFormat} />}
      {view && (
        <PieActiveArc
          palette={palette}
          data={formateDataForPieChartInAccountPage(members, "member")}
        />
      )}
    </>
  );
};

const columns = ["Rank", "Name", "Total"];

export default Top_3_Team_Members_Table;
