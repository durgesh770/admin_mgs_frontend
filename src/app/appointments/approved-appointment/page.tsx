"use client";

import ApprovedAppointment from "@/features/Appointments/ApprovedAppointment/ApprovedAppointment";
import React from "react";

//hooks
import { setTeamMemberColors } from "@/hooks/TeamMembers";
import { SecurePageByPackage } from "@/middleware/PermissionAccess";

const page = () => {
  setTeamMemberColors();

  return (
    <>
      <ApprovedAppointment />
    </>
  );
};

export default SecurePageByPackage(page, ["view_appointments"]);
