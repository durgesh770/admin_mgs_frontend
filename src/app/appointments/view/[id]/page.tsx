"use client";

import ViewAppointment from "@/features/Appointments/ViewAppointment/ViewAppointment";
import React from "react";

import { useParams } from "next/navigation";
import { getAppointmentById } from "@/hooks/Appointment";
import { SecurePageByPackage } from "@/middleware/PermissionAccess";

const page = () => {
  const { id } = useParams();
  const appointment = getAppointmentById(id);

  return (
    !appointment.loading && (
      <>
        {appointment.data ? (
          <ViewAppointment data={appointment.data} />
        ) : (
          <h1 className="text-center text-red-500 min-h-screen">
            Appointment Not found
          </h1>
        )}
      </>
    )
  );
};

export default SecurePageByPackage(page, ["view_appointments"]);
