"use client";
import { ViewInvoice } from "@/features/Payment/ViewInvoice/ViewInvoice";
import { SecurePageByPackage } from "@/middleware/PermissionAccess";
import React from "react";

const page = () => {
  return (
    <>
      <ViewInvoice />
    </>
  );
};

export default SecurePageByPackage(page, ["view_invoice"]);
