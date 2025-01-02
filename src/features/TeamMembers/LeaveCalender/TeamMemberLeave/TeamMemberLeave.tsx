import Button from "@/components/ui/Button";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import React from "react";
import { useLeaveDatesTeamMember } from "@/hooks/LeaveCalender/LeaveRequest";
import moment from "moment";

const TeamMemberLeave = ({ user }: any) => {
  const { dates } = useLeaveDatesTeamMember(user?.id);
  console.log(dates
    )
  return (
    <>
      <Card className="mt-4">
        <CardContent>
          <h1 className="mb-2 text-sm font-semibold text-[--brand-color]">
            DAYS SELECTED FOR LEAVES
          </h1>
          <Divider/>
          
          {dates?.map((item, index) => {
            return (
              <div key={index} className="mt-2">
                {moment(item).format("DD MMM YYYY")}
              </div>
            );
          })}

          <Grid className="mt-5 " onClick={()=> window.location.href = "/team-members/leave-calender"}>
            <Button loading={false} btnType="secondary">
              Manage Leave
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
export default TeamMemberLeave;
