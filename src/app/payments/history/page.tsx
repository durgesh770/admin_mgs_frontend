'use client'

import PaymentHistoryfeature from "@/features/PaymentHistory/PaymentHistoryfeatures";
import { SecurePageByPackage } from "@/middleware/PermissionAccess";
import React from "react";

const page = () => {
  return (
    <>
      <PaymentHistoryfeature />
      {/* need to work on this */}
    </>
  );
};
export default SecurePageByPackage(page,["view_payments"])
