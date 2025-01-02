"use client";
//features
import { AppointmentReport } from "@/features/Reports/Appointment-report/AppointmentReport";
import Bottom_5_Services from "@/features/Reports/Analytics/Bottom_5_Services";
import Top_2_Bookable_Days from "@/features/Reports/Analytics/Top_2_Bookable_Days";
import Top_3_Team_Members from "@/features/Reports/Analytics/Top_3_Team_Members";
import Top_5_Bookable_Timeslot from "@/features/Reports/Analytics/Top_5_Bookable_Timeslot";
import Top_5_Customers from "@/features/Reports/Analytics/Top_5_Customers";
import Top_5_Grossing_Services from "@/features/Reports/Analytics/Top_5_Grossing_Services";
import Top_5_Services from "@/features/Reports/Analytics/Top_5_Services";
//mui
import { Grid } from "@mui/material";

import { SecurePageByPackage } from "@/middleware/PermissionAccess";

const Page = () => {
  return (
    <>
      <div className="min-h-screen ml-2 md:ml-5 ">
        <div>
          <AppointmentReport />{" "}
        </div>
        <Grid className="flex flex-wrap items-start gap-10 mr-3 text-start ">
          <Top_5_Services />
          <Top_5_Grossing_Services />
          <Bottom_5_Services />
          <Top_3_Team_Members />
          <Top_5_Bookable_Timeslot />
          <Top_2_Bookable_Days />
          <Top_5_Customers />
        </Grid>
      </div>
    </>
  );
};

export default SecurePageByPackage(Page, ["appointment_report"]);
