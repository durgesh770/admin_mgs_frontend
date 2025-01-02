//react
import React from "react";
//mui
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HistoryIcon from "@mui/icons-material/History";
import { AppointmentCard } from "@/components/ui/Report/AppointmentReport/AppointmentCard";
//hook
import {
  useGetMonthEarning,
  useGetThisEarning,
  useGetWeekEarning,
} from "@/hooks/TimeTracker";

const PayrollCards = () => {
  const { last } = useGetMonthEarning();
  const { data } = useGetWeekEarning();
  const { thisData } = useGetThisEarning();

  const todayEarnings = thisData.totalAmount;
  const weekEarnings = data.totalAmount;
  const MonthEarnings = last.totalAmount;

  return (
    <div className="flex lg:flex-row flex-col lg:gap-0 gap-3 items-center justify-evenly">
      <AppointmentCard
        icon={<TodayIcon />}
        appointmentCount={todayEarnings}
        cardTitle="Today's Earnings"
        bgCustom={true}
        dollarIcon={true}
      />
      <AppointmentCard
        icon={<DateRangeIcon />}
        appointmentCount={weekEarnings.toFixed(2)}
        cardTitle="This Week's Earnings"
        bgCustom={true}
        dollarIcon={true}
      />
      <AppointmentCard
        icon={<HistoryIcon />}
        appointmentCount={MonthEarnings.toFixed(2)}
        cardTitle="This Month's Earnings"
        bgCustom={true}
        dollarIcon={true}
      />
    </div>
  );
};

export default PayrollCards;
