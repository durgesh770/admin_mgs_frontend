//react
import React from "react";
//mui
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventIcon from "@mui/icons-material/Event";
//hook
import {
  useGetProfitLossMonth,
  useGetProfitLossThis,
  useGetProfitLossWeek,
} from "@/hooks/Accounts/Accounts";
import { AppointmentCard } from "../../Report/AppointmentReport/AppointmentCard";

const IvsECards = () => {
  const { thisData } = useGetProfitLossThis();
  const { week } = useGetProfitLossWeek();
  const { month } = useGetProfitLossMonth();

  const todayProfitLoss = thisData.totalRevenue - thisData.totalExpense;
  const weeklyProfitLoss = week.totalRevenue - week.totalExpense;
  const monthlyProfitLoss = month.totalRevenue - month.totalExpense;

  return (
    <div className="flex flex-wrap gap-9 mt-7 ">
      <AppointmentCard
        icon={<EventIcon />}
        appointmentCount={todayProfitLoss.toFixed(2)}
        cardTitle="Today's Profit/Loss"
        bgCustom={true}
        dollarIcon={true}
      />
      <AppointmentCard
        icon={<EventIcon />}
        appointmentCount={weeklyProfitLoss.toFixed(2)}
        cardTitle="This Week's Profit/Loss"
        bgCustom={true}
        dollarIcon={true}
      />
      <AppointmentCard
        icon={<CalendarTodayIcon />}
        appointmentCount={monthlyProfitLoss.toFixed(2)}
        cardTitle="This Month's Profit/Loss"
        bgCustom={true}
        dollarIcon={true}
      />
    </div>
  );
};

export default IvsECards;
