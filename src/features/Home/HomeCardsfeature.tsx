import { AppointmentCard } from "@/components/ui/Report/AppointmentReport/AppointmentCard";
import React from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useGetAllApprovedReports, useGetAllReports } from "@/hooks/Accounts/Accounts";
import TodayIcon from "@mui/icons-material/Today";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIcon from "@mui/icons-material/Assignment";

const HomeCardsfeature = () => {
  const allreports = useGetAllReports();
  const allAppprovedRepots = useGetAllApprovedReports();

  return (
    <>
      <div className="flex lg:flex-row flex-col gap-8 mt-7 items-center justify-center lg:mx-10">
        <AppointmentCard
          icon={<TodayIcon />}
          cardTitle="My Today's Appointment"
          appointmentCount={allAppprovedRepots.approved?.myTodaysAppointments}
          widthCustom={true}
        />
        <AppointmentCard
          icon={<EventIcon />}
          cardTitle="This Week"
          appointmentCount={allAppprovedRepots.approved?.thisWeekAppointments}
          widthCustom={true}
        />
        <AppointmentCard
          icon={<DateRangeIcon />}
          cardTitle="This Month"
          appointmentCount={allAppprovedRepots.approved?.thisMonthAppointments}
          widthCustom={true}
        />
        <AppointmentCard
          icon={<AssignmentIcon />}
          cardTitle="Total Appointments"
          widthCustom={true}
          appointmentCount={allreports.data?.totalAppointments}
        />
      </div>
    </>
  );
};

export default HomeCardsfeature;
