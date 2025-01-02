"use client";
import CreateAppointments from "@/features/Appointments/CreateAppointments/CreateAppointments";
import { SecurePageByPackage } from "@/middleware/PermissionAccess";
import React from "react";

const page = () => {
  return (
    <>
      <CreateAppointments />
    </>
  );
};

export default SecurePageByPackage(page, ["create_appointments"]);
