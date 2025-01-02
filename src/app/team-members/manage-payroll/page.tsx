"use client";


//react
import React from "react";
//component
import { ManagePayrollfeature } from "@/features/ManagePayroll/ManagePayrollfeature";
import { SecurePageByPackage } from "@/middleware/PermissionAccess";

const page = () => {
  return <ManagePayrollfeature />;
};
export default SecurePageByPackage(page, ["view_payroll"]);
