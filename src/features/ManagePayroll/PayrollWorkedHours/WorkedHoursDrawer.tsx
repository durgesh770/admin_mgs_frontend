//react
import React, { useEffect, useState } from "react";
//component
import Button from "@/components/ui/Button";
import { AddTime } from "../../../components/ui/ManagePayrollUI/AddTime";
import WarningModal from "@/components/ui/Modal/Warning";
import SideDrawer from "@/components/ui/SideDrawer";
import WorkedHoursTable from "./WorkedHoursTable";
//utils
import { TotalTip } from "@/utils/functions";
//hook
import {
  useCreateTime,
  useDeleteInsideDataTimeTracker,
  useUpdateInsideTimeTrackerEntry,
} from "@/hooks/TimeTracker";
import { useSnackbar } from "@/context/GlobalContext";

export const WorkedHoursDrawer = ({
  setIsDrawerOpen,
  isDrawerOpen,
  hours,
  setHours,
  trackerId,
  refetch,
  isAction,
}: any) => {
  const alert = useSnackbar();
  // hooks integration
  const { handleCreateTime, loading } = useCreateTime();
  const { handleUpdateEntry, loader } = useUpdateInsideTimeTrackerEntry();
  const { handleDelete, deleteLoading } = useDeleteInsideDataTimeTracker();

  const globalLoader = !loading ? loading : loader;
  // state
  const [showAddTime, setShowAddTime] = useState(false);
  const [fields, setFields] = useState<any[]>([
    {
      startTime: 1400,
      endTime: 1500,
      workedType: "Appointment",
      reference: "",
      duration: 60,
    },
  ]);
  const [hidden, setHidden] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // this state used in table component store data of three dot btn
  const [currentbtn, setCurrentbtn] = useState({
    currentOptions: -1,
    id: { _id: "" },
  });

  const handleSubmitbtn = () => {
    // fomate data
    const formateData = {
      teamMemberId: hours.teamMemberId?.id,
      date: hours.date,
      hours: fields,
    };

    //task validation
    const isTaskEmpty = fields.some(
      (field: any) => field.workedType.trim() == ""
    );
    if (isTaskEmpty) {
      alert.SnackbarHandler(true, "error", "Task is Required");
    } else if (currentbtn.currentOptions == 1) {
      handleUpdateEntry(trackerId, currentbtn.id._id, fields[0], refetch);
    } else {
      handleCreateTime(formateData, refetch);
    }
  };

  useEffect(() => {
    if (loading) {
      setShowAddTime(false);
    }
  }, [loading]);

  useEffect(() => {
    if (loader) {
      setShowAddTime(false);
    }
  }, [loader]);

  return (
    <>
      <SideDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Worked Hours Detail"
        headerHidden={true}
        customWidth={true}
      >
        <div className="px-4 py-4 ">
          <div className="flex items-center justify-between mx-1 mb-4">
            <h2 className="font-bold ">
              Total Earning : ${TotalTip(hours?.hours)}
            </h2>
            {!isAction && (
              <>
                {!showAddTime && (
                  <div className="w-fit">
                    <Button
                      loading={false}
                      btnType={"secondary"}
                      onClick={() => {
                        setHidden(true);
                        setShowAddTime(true);
                        setFields([
                          {
                            startTime: 1400,
                            endTime: 1500,
                            workedType: "Appointment",
                            reference: "",
                            duration: 60,
                          },
                        ]);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                )}
                {showAddTime && (
                  <div className="w-fit">
                    <Button
                      loading={false}
                      btnType={"red"}
                      onClick={() => setShowAddTime(false)}
                    >
                      Close
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="mb-5">
            {showAddTime && (
              <AddTime
                activebtn={hidden}
                setFields={setFields}
                fields={fields}
                handleSubmitbtn={handleSubmitbtn}
                loading={globalLoader}
              />
            )}
          </div>
          <WorkedHoursTable
            setIsDrawerOpen={setIsDrawerOpen}
            setHidden={setHidden}
            setShowAddTime={setShowAddTime}
            setFields={setFields}
            hours={hours}
            setCurrentbtn={setCurrentbtn}
            setModalOpen={setModalOpen}
            isAction={isAction}
          />
        </div>
      </SideDrawer>

      <WarningModal
        open={modalOpen}
        updateOpen={() => setModalOpen(false)}
        title={"Are you sure you want to delete ?"}
        handleLeftbtn={() =>
          handleDelete(trackerId, currentbtn.id._id, refetch, setModalOpen)
        }
        handleRightbtn={() => setModalOpen(false)}
        btnfirst={"Delete"}
        btnSec={"No"}
        loading={!deleteLoading}
      />
    </>
  );
};
