//components
import { AppointmentCard } from "@/components/ui/Report/AppointmentReport/AppointmentCard";
//react
import React from "react";
//mui
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventIcon from "@mui/icons-material/Event";
import DateRangeIcon from "@mui/icons-material/DateRange";
import UpdateIcon from "@mui/icons-material/Update";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import {
  useGetAllApprovedReports,
  useGetAllReports,
} from "@/hooks/Accounts/Accounts";

export interface AppointmentReport {
  adminRescheduleRequests: number;
  cancelledAppointmentsThisMonth: number;
  unapprovedAppointments: number;
  totalAppointments: number;
}

export const AppointmentReport = () => {
  const allreports = useGetAllReports();
  const allAppprovedRepots = useGetAllApprovedReports();

  const appointments = [
    {
      count: allAppprovedRepots.approved?.myTodaysAppointments,
      title: "My Today's Appointments",
      icon: <CalendarTodayIcon />,
    },
    {
      count: allAppprovedRepots.approved?.todaysAppointments,
      title: "Today's Appointment ",
      icon: <NotificationsIcon />,
    },
    {
      count: allAppprovedRepots.approved?.thisWeekAppointments,
      title: "This Week ",
      icon: <EventIcon />,
    },
    {
      count: allAppprovedRepots.approved?.thisMonthAppointments,
      title: "This Month ",
      icon: <DateRangeIcon />,
    },
    {
      count: allAppprovedRepots.approved?.rescheduledAppointments,
      title: "Rescheduled ",
      icon: <UpdateIcon />,
    },
    {
      count: allreports.data?.adminRescheduleRequests,
      title: "Admin Reschedule Request",
      icon: <PendingActionsIcon />,
    },
    {
      count: allreports.data?.cancelledAppointmentsThisMonth,
      title: "Cancelled Appointments ",
      icon: <HighlightOffIcon />,
    },
    {
      count: allreports.data?.unapprovedAppointments,
      title: "Unapproved Appointments ",
      icon: <AssignmentLateIcon />,
    },
    {
      count: allreports.data?.totalAppointments,
      title: "Total Appointments ",
      icon: <CalendarViewDayIcon />,
    },
  ];
  return (
    <>
      <div className="mb-12 ">
        <div className="mb-9 mt-2 ">
          <h4 className="mb-0 text-xl font-bold sm:text-2xl">
            Appointment Report
          </h4>
        </div>
        <div className="flex flex-wrap gap-8 text-start items-start  ">
          {appointments.map((appointment, index) => (
            <AppointmentCard
              key={index}
              icon={appointment.icon}
              appointmentCount={appointment.count}
              cardTitle={appointment.title}
            />
          ))}
        </div>
      </div>
    </>
  );
};
