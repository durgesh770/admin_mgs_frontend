"use client";

import CreatePermission from "@/features/Permissions/create-permission";
import { SecurePageByPackage } from "@/middleware/PermissionAccess";
import React from "react";

const page = () => {
  return (
    <>
      <CreatePermission />
    </>
  );
};

export default SecurePageByPackage(page, ["create_permission"]);
