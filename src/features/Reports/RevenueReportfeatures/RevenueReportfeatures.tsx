"use client";
//react
import React, { useState } from "react";
//feature
import BookingRevenueFeature from "./RevenueFeatures/BookingRevenueFeature";
import BookingExpenseFeature from "./RevenueFeatures/BookingExpenseFeature";
import OtherRevenueFeatures from "./RevenueFeatures/OtherRevenueFeatures";
import OtherExpenseFeatures from "./RevenueFeatures/OtherExpenseFeatures";
//mui
import TableChartIcon from "@mui/icons-material/TableChart";
//components
import RevenueCards from "@/components/ui/Report/RevenueReport/RevenueCards";
import Tab from "@/components/ui/Tabs/Tab";
//next
import { useAuth } from "@/context/AuthContext";
import { getExistingTab } from "@/utils/functions";

const RevenueReportfeatures = () => {
  const [selectedTab, setSelectedTab] = useState(getExistingTab());
  const { permissions } = useAuth();

  const booking_revenue = permissions.includes("booking_revenue");
  const booking_expense = permissions.includes("booking_expense");

  const other_revenue = permissions.includes("other_revenue");
  const other_expense = permissions.includes("other_expense");

  // tab data
  const tabs = [
    booking_revenue && { label: "Booking Revenue", icon: <TableChartIcon /> },
    booking_expense && { label: "Booking Expense", icon: <TableChartIcon /> },
    other_revenue && { label: "Other Revenue", icon: <TableChartIcon /> },
    other_expense && { label: "Other Expense", icon: <TableChartIcon /> },
  ].filter((item) => item);

  return (
    <>
      <div className="bg-[--brand-white-color] border border-[--brand-light-gray-color] m-auto  p-4 t min-h-screen md:w-[50vw]">
        <div className="flex flex-row items-center justify-center mt-3">
          <h1 className="mb-0 font-bold  md:text-[2rem] text-[1.5rem] ">
            Revenue Report{" "}
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center mt-3 ">
          <RevenueCards />
        </div>
        <div className="py-4 mt-3">
          <Tab value={selectedTab} setValue={setSelectedTab} tabs={tabs} />
        </div>

        {selectedTab == 0 && booking_revenue && <BookingRevenueFeature />}
        {selectedTab == 1 && booking_expense && <BookingExpenseFeature />}

        {selectedTab == 2 && other_revenue && (
          <OtherRevenueFeatures selectedTab={selectedTab} />
        )}
        {selectedTab == 3 && other_expense && (
          <OtherExpenseFeatures selectedTab={selectedTab} />
        )}
      </div>
    </>
  );
};

export default RevenueReportfeatures;
