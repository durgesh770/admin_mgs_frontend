"use client";

import React from "react";
import { useParams } from "next/navigation";

import EditAppointments from "@/features/Appointments/EditAppointments/EditAppointments";
import { SecurePageByPackage } from "@/middleware/PermissionAccess";

const page = () => {
  const { id } = useParams();

  return (
    <>
      <EditAppointments appointmentId={id} />
    </>
  );
};

export default SecurePageByPackage(page, ["edit_appointments"]);
