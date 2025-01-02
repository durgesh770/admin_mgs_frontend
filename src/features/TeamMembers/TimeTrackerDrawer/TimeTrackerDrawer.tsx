// react
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
// utils
import { formatTime, removeQuery } from "@/utils/tools";
// component
import SideDrawer from "@/components/ui/SideDrawer";
import TimeTrackerCardDetails from "./TimeTrackerCardDetails";
import OnlyTimeTracker from "../../../components/ui/TeamMember/TimeTrackerUI/OnlyTimeTracker";
import DropDownSelect from "@/components/ui/DropDownSelect";
// hooks
import { useCreateTime, useGetTodayAppointment } from "@/hooks/TimeTracker";
// context
import { useAuth } from "@/context/AuthContext";
import { useTimeTracker } from "@/context/TimeTrackerContext";
import Button from "@/components/ui/Button";
import { convertDataFormat } from "@/utils/functions";

const TimeTrackerDrawer = () => {
  // router
  const router = useRouter();
  // integration hooks
  const { user } = useAuth();
  const { data } = useGetTodayAppointment(user.id);
  const { isDrawerOpen, setIsDrawerOpen } = useTimeTracker();
  const { setSelect, select, completedTime } = useTimeTracker();
  const { handleCreateTime, loading } = useCreateTime();

  useEffect(() => {
    if (select.trim()) {
      localStorage.setItem("timeTrackerSelect", select);
    }
  }, [select]);

  // drop down list data
  const option = {
    placeHolder: "Select",
    data: data.map((item: any) => ({
      id: item.customerId.id,
      title: item.customerId.name + " " + formatTime(item.start_time_range),
    })),
    name: "Select Appointment",
  };

  const handleSaveTime = () => {
    handleCreateTime(convertDataFormat(completedTime, user.id), false);
    localStorage.removeItem("completedTime");
  };

  return (
    <div>
      <SideDrawer
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          removeQuery(router, ["timeTracker"]);
        }}
        headerHidden={true}
        title="Time Tracker"
      >
        <div className="px-4 py-4 sm:px-11  ">
          <div className="border border-gray-100 bg-[--brand-white-color] rounded-md shadow-md p-5">
            <span className="input-label"></span>
            <div className="mb-5">
              <DropDownSelect
                data={option}
                value={select}
                setData={(selectedValue: any) => setSelect(selectedValue)}
              />
            </div>
            {/* time tracker  */}
            <OnlyTimeTracker />
          </div>
          {/* time tracker card */}
          {Object.keys(completedTime).length > 0 && (
            <>
              <TimeTrackerCardDetails />
              <div className="mt-5">
                <Button
                  onClick={handleSaveTime}
                  btnType="primary"
                  loading={!loading}
                >
                  Save
                </Button>
              </div>
            </>
          )}
        </div>
      </SideDrawer>
    </div>
  );
};

export default TimeTrackerDrawer;
