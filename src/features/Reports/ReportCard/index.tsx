// react 
import React from "react";
// component
import ReportHeader from "./ReportHeader";
// mui
import { Grid } from "@mui/material";

// interface
interface ReportCardProps {
  title: string;
  TableComponent?: React.ReactNode;
  setDateRange: any;
  dateRange: { from: Date | null; to: Date | null };
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  HandleResetFilter: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({
  title,
  TableComponent,
  setDateRange,
  dateRange,
  setFilter,
  filter,
  HandleResetFilter,
}) => {
  return (
    <div className="bg-[--brand-white-color] border border-[--brand-light-gray-color] shadow-sm md:p-5 p-3 mb-2 ">
      <Grid
        sx={{
          margin: "auto",
          paddingBottom: "10px",
          "@media (width>2100px)": {
            width: "calc(100vw - 60vw)",
          },
          "@media (max-width: 2099px)": {
            width: "calc(100vw - 62vw)",
          },
          "@media (max-width: 1750px)": {
            width: "calc(100vw - 65vw)",
          },
          "@media (max-width: 1400px)": {
            width: "calc(100vw - 25rem)",
          },
          "@media (max-width: 900px)": {
            width: "calc(100vw - 22rem)",
          },
          "@media (max-width: 638px)": {
            width: "calc(100vw - 4rem)",
          },
          "@media (max-width: 500px)": {
            width: "calc(100vw - 4rem)",
          },
        }}
      >
        {/* Top */}
        <ReportHeader
          setDateRange={setDateRange}
          dateRange={dateRange}
          setFilter={setFilter}
          filter={filter}
          title={title}
          HandleResetFilter={HandleResetFilter}
        />

        {/* Body */}
        <div className="mt-4">{TableComponent}</div>
      </Grid>
    </div>
  );
};

export default ReportCard;
