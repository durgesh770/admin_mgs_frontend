'use client'
//react
import React from "react";
//feature
import RevenueReportfeatures from "@/features/Reports/RevenueReportfeatures/RevenueReportfeatures";

import { SecurePageByPackage } from "@/middleware/PermissionAccess";

const Page = () => {
  return (
    <>
      <RevenueReportfeatures />
    </>
  );
};
export default SecurePageByPackage(Page, ["manage_sales_revenue_report"]);
