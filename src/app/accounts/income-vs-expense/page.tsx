'use client'
//react
import React from "react";
//feature
import IvsEfeatures from "@/features/Reports/IncomeVSexpense/IvsEfeatures";
import { SecurePageByPackage } from "@/middleware/PermissionAccess";

const Page = () => {
  return (
    <>
      <IvsEfeatures />
    </>
  );
};

export default SecurePageByPackage(Page, ["view_income_vs_expense_report"]);
