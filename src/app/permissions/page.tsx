"use client";

import PermissionTable from "@/features/Permissions";
import { SecurePageByPackage } from "@/middleware/PermissionAccess";
import React from "react";

const page = () => {
  return (
    <>
      <PermissionTable />
    </>
  );
};

export default SecurePageByPackage(page, ["view_permission"]);
