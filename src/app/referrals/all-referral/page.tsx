"use client";
//react
import React from "react";
//feature
import { AllReferral } from "@/features/Referral/AllReferral/AllReferral";
import { SecurePageByPackage } from "@/middleware/PermissionAccess";

const Page = () => {
  return (
    <>
      <AllReferral />
    </>
  );
};
export default SecurePageByPackage(Page, ["view_referral"]);
