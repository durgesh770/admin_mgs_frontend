// Component imports
import React, { useState } from "react";

// mui
import { Card, CardContent, Divider, Grid } from "@mui/material";

// Component
import StaffMemberModal from "@/features/TeamMembers/TeamMemberHours/TeamMemberModal";

// integration
import { convertSchedule } from "@/utils/tools";
import { TeamMembers } from "@/interface/TeamMembers";
import { updateStaffHours } from "@/hooks/TeamMembers/StaffHours";
import Button from "../../Button";

interface StaffMemberHoursProps {
  user: TeamMembers;
  isEdit?:boolean;

}

const StaffMemberHours: React.FC<StaffMemberHoursProps> = ({ user,isEdit }) => {
  let timetable = user.staffHours?.timetable;

  // Convert timetable to a more readable format
  const tableFormat: any = convertSchedule(timetable);
  const table = Object.keys(tableFormat);

  //integration
  const [formData, setFormData] = useState({
    onlineBooking: user.staffHours?.onlineBooking,
    timetable: timetable,
  });

  const updateHours = updateStaffHours(user.id);

  return (
    <>
      <Card className="mt-4">
        <CardContent>
          <h1 className="mb-2 text-sm font-semibold text-[--brand-color]">
            TEAM MEMBER HOURS
          </h1>
          <Divider />
          <div className="p-3">
            {table.map((key) => {
              const item = tableFormat[key];
              return (
                <div className="flex items-center mb-2">
                  <h1 className="text-xs w-[20%]">{key}</h1>
                  <h1 className="text-xs  w-[75%]">
                    {item.length > 0 ? (
                      <>{String(item)}</>
                    ) : (
                      <span className="text-gray-300">None</span>
                    )}
                  </h1>
                </div>
              );
            })}
          </div>

          <Grid className="mt-4 ">
            {/* Open modal on button click */}
            { 
          !isEdit && 
            <Button loading={false} btnType="secondary">
              <StaffMemberModal
                user={user}
                setOnlineBooking={(booking) =>
                  setFormData({ ...formData, onlineBooking: booking })
                }
                setTimeTableData={(table) =>
                  setFormData({ ...formData, timetable: table })
                }
                submit={() => updateHours.submit(formData)}
              />
            </Button>
}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default StaffMemberHours;
