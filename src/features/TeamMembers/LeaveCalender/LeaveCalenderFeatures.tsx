"use client";
import React, { useState } from "react";
//mui
import { TableChart, CalendarToday } from "@mui/icons-material";
// component
import Button from "@/components/ui/Button";
import Tab from "@/components/ui/Tabs/Tab";
import { RequestLeave } from "@/components/ui/LeaveCalender/RequestLeave/RequestLeave";
import LeaveCalenderTable from "./LeaveCalenderTable";
import LeaveCalenderTableMobile from "./LeaveDetailsForCalender";
import {
  useApprovedLeaveRequests,
  useDeleteLeaveRequests,
  useGetAllLeaveRequests,
  useLongMenuLeaveRequest,
} from "@/hooks/LeaveCalender/LeaveRequest";
import WarningModal from "@/components/ui/Modal/Warning";
import ShowDatesModal from "@/components/ui/LeaveCalender/ShowDatesModal";
import AddAdminComments from "./AddAdminComments";

import FullCalendarView from "./Calendar";
import { formatLeaveCalanderData } from "@/hooks/LeaveCalender/hook";
import { getExistingTab } from "@/utils/functions";

const LeaveCalenderFeatures = () => {
  // integration
  const leaveHook = useGetAllLeaveRequests();
  const { handleApprovedLeave } = useApprovedLeaveRequests();
  const { handleDeleteLeave } = useDeleteLeaveRequests();

  // state
  const [tabValue, setTabValue] = useState(getExistingTab());
  const [calender, setCalender] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [defaultModal, setDefaultModal] = useState(false);
  const [open, setOpen] = useState(false);

  // this state used in table component store data of three dot btn
  const [currentbtn, setCurrentbtn] = useState({
    currentOptions: -1,
    id: null,
  });
  // state manage
  const [leaveDates, setLeaveDates] = useState<{
    dates: string[];
    status: boolean;
  }>({
    dates: [],
    status: true,
  });

  // state used for create and edit leave request *****************
  const [selectedValue, setSelectedValue] = useState("single");
  const [textareaValue, setTextareaValue] = useState("");
  const [leave, setLeave] = useState("Sick");
  const [teamMember, setTeamMember] = useState({
    id: "",
    title: "",
  });
  // multiple date logic state
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [multiDate, setMultiDate] = useState([tomorrow]);
  const [rageDate, setRangeDate] = useState([tomorrow]);
  // end of state create and edit leave request ********************

  const handleTabChange = (newValue: any) => {
    setTabValue(newValue);
  };

  const tabs = [
    { label: "Tabular view", icon: <TableChart /> },
    { label: "Calendar view", icon: <CalendarToday /> },
  ];

  // handle create and edit leave request btn
  const handleopenDrawer = () => {
    setDrawerOpen(true);
    setTeamMember({ id: "", title: "" });
    setLeave("Sick");
    setTextareaValue("");
    setSelectedValue("single");
    setMultiDate([tomorrow]);
    setRangeDate([tomorrow]);
    setCurrentbtn((prev) => ({
      ...prev,
      id: null,
    }));
  };

  // hanlde three dot
  const {
    warning,
    handleLeftBtnClick,
    handleOptions,
    handleRightBtnClick,
    setModalOpen,
    modalOpen,
    commentAdmin,
    setCommentAdmin,
    option,
  } = useLongMenuLeaveRequest({
    handleApprovedLeave,
    handleDeleteLeave,
    setDrawerOpen,
    setCurrentbtn,
    currentbtn,
    setDefaultModal,
  });

  const [leaveRequestModal, setLeaveRequestModal] = useState();

  const format = formatLeaveCalanderData(leaveHook.leave);
  const handleEventClick = (eventClickInfo: any) => {
    // Handle the event click logic here
    const item = eventClickInfo?.event?.extendedProps?.data?.other;
    setLeaveRequestModal(item);
    setDefaultModal(true);
  };

  return (
    <>
      <div className="min-h-screen container-full">
        <div className="flex flex-row items-center justify-between gap-10 pt-4">
          <h4 className="mb-0 text-xl font-bold sm:text-2xl">Leave Calender</h4>

          <div className="w-fit">
            <Button
              loading={false}
              btnType="secondary"
              onClick={handleopenDrawer}
            >
              Request Leave
            </Button>
          </div>
        </div>

        <div className="py-4 ">
          <Tab value={tabValue} setValue={handleTabChange} tabs={tabs} />

          {tabValue === 0 && (
            <LeaveCalenderTable
              handleOptions={handleOptions}
              option={option}
              setLeaveDates={setLeaveDates}
              setOpen={setOpen}
              data={leaveHook.leave}
            />
          )}

          {tabValue === 1 && (
            <div>
              {/* <FullCalendar /> */}
              <FullCalendarView
                events={format}
                handleEventClick={handleEventClick}
                open={calender}
                setOpen={setCalender}
              />
            </div>
          )}

          <RequestLeave
            setDrawerOpen={setDrawerOpen}
            drawerOpen={drawerOpen}
            currentbtn={currentbtn}
            setSelectedValue={setSelectedValue}
            selectedValue={selectedValue}
            textareaValue={textareaValue}
            setLeave={setLeave}
            setTextareaValue={setTextareaValue}
            leave={leave}
            setTeamMember={setTeamMember}
            teamMember={teamMember}
            setMultiDate={setMultiDate}
            rageDate={rageDate}
            setRangeDate={setRangeDate}
            multiDate={multiDate}
          />
        </div>

        <WarningModal
          open={modalOpen}
          updateOpen={() => setModalOpen(false)}
          title={warning.title}
          handleLeftbtn={handleLeftBtnClick}
          handleRightbtn={handleRightBtnClick}
          btnfirst={warning.btnFirstName}
          btnSec={warning.btnSecName}
        />

        <ShowDatesModal
          open={open}
          setOpen={() => setOpen(false)}
          leaveDates={leaveDates}
        />

        <AddAdminComments
          commentAdmin={commentAdmin}
          setCommentAdmin={setCommentAdmin}
          currentbtn={currentbtn}
        />

        <div className="mt-6">
          {leaveRequestModal && (
            <LeaveCalenderTableMobile
              setDefaultModal={setDefaultModal}
              defaultModal={defaultModal}
              option={option}
              handleOptions={handleOptions}
              setLeaveDates={setLeaveDates}
              setOpen={setOpen}
              item={leaveRequestModal}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default LeaveCalenderFeatures;
