"use client";
import AllAppointment from "@/features/Appointments/AllAppointment/AllAppointment";
import React from "react";

//hooks
import { setTeamMemberColors } from "@/hooks/TeamMembers";
import { SecurePageByPackage } from "@/middleware/PermissionAccess";

const Page = () => {
  setTeamMemberColors();

  return (
    <>
      <AllAppointment />
    </>
  );
};

export default SecurePageByPackage(Page, ["view_appointments"]);
