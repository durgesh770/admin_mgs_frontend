import React from "react";
import { AppointmentCard } from "../../Report/AppointmentReport/AppointmentCard";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useGetTotalRevenue } from "@/hooks/Accounts/Revenue";
import { useGetTotalExpense } from "@/hooks/Accounts/Expense";
import { PermissionAccess } from "@/middleware/PermissionAccess";
import { useGetProfitLossThis } from "@/hooks/Accounts/Accounts";

const RevenueCards = () => {
  const { totalRevenue } = useGetTotalRevenue();
  const { totalExpense } = useGetTotalExpense();
  const { thisData } = useGetProfitLossThis();

  const totalrevenue = totalRevenue.amount;
  const totalexpense = totalExpense.amount;
  const todayIncome = thisData.totalRevenue;

  return (
    <div className="flex flex-wrap gap-8 mt-7 ">
      <AppointmentCard
        icon={<MonetizationOnIcon />}
        appointmentCount={todayIncome.toFixed(2)}
        cardTitle="Today's Income"
        bgCustom={true}
        dollarIcon={true}
      />

      <PermissionAccess
        requiredPermissions={["booking_revenue", "other_revenue"]}
      >
        <AppointmentCard
          icon={<MonetizationOnIcon />}
          appointmentCount={parseInt(totalrevenue).toFixed(2)}
          cardTitle="Total Revenue"
          bgCustom={true}
          dollarIcon={true}
        />
      </PermissionAccess>

      <PermissionAccess
        requiredPermissions={["booking_expense", "other_expense"]}
      >
        <AppointmentCard
          icon={<MoneyOffIcon />}
          appointmentCount={parseInt(totalexpense).toFixed(2)}
          cardTitle="Total Expense"
          bgCustom={true}
          dollarIcon={true}
        />
      </PermissionAccess>
    </div>
  );
};

export default RevenueCards;
