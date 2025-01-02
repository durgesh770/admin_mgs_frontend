"user client";
import AppointmentsDetails from "@/components/ui/Appointments/AppointmentsDetails/AppointmentsDetails";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";


// Inside AppointmentsDetails component:
interface AppointmentDetailsProps {
  details: {
    note: string;
    date: any;
    time: any;
  };
  setDetails?: any;
}

const AppointmentDetailsFeatures: React.FC<AppointmentDetailsProps> = ({
  details,
  setDetails,
}) => {
  // set note
  const [data, setData] = useState(details);

  useEffect(() => {
    if (!setDetails) return;
    setDetails({
      note: data.note,
      date: dayjs(data.date).format("YYYY-MM-DD"),
      time: data.time,
    });
  }, [data]);

  return (
    <>
      <AppointmentsDetails data={data} setData={setData} />
    </>
  );
};

export default AppointmentDetailsFeatures;
