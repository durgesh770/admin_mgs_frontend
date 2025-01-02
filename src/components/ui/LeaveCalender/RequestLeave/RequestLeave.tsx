import React, { useEffect, useState } from "react";
// component
import SideDrawer from "../../SideDrawer";
import Button from "../../Button";
import Input from "../../Input";
import MultiDatePicker from "../../MultiDatePicker/MultiDatePicker";
import RangeDatePicker from "../../RangeDatePicker/RangeDatePicker";
import ShowDatesModal from "../ShowDatesModal";
import Autocomplete from "../../Autocomplete/Autocomplete";
// utils
import {
  getAllDatesBetween,
  getStartDateEndDate,
  getTotalDaysBetweenDates,
} from "@/utils/tools";
// middleware Permission
import { PermissionAccess } from "@/middleware/PermissionAccess";
// hooks
import {
  useCreateLeaveRequests,
  useUpdateLeaveRequests,
} from "@/hooks/LeaveCalender/LeaveRequest";
// context
import { useAuth } from "@/context/AuthContext";
import { useSnackbar } from "@/context/GlobalContext";
// interface
import { RequestLeaveprops } from "@/interface/LeaveRequest";
import { getTeamMembers } from "@/hooks/TeamMembers";
import DropDownSelect from "../../DropDownSelect";

export const RequestLeave = ({
  setDrawerOpen,
  drawerOpen,
  currentbtn,
  setSelectedValue,
  selectedValue,
  textareaValue,
  setTextareaValue,
  setLeave,
  teamMember,
  setTeamMember,
  leave,
  setMultiDate,
  rageDate,
  setRangeDate,
  multiDate,
}: RequestLeaveprops) => {
  // integration
  const { data } = getTeamMembers()
  const createLeave = useCreateLeaveRequests();
  const updateLeave = useUpdateLeaveRequests();
  const { permissions, user } = useAuth();
  const isAdmin = permissions.includes("manage_leave_request");
  const alert = useSnackbar();

  // global loading
  const globalLoading = createLeave.loading
    ? createLeave.loading
    : updateLeave.loading;

  // open modal for list all dates
  const [open, setOpen] = useState(false);

  // edit logic
  const existingData = currentbtn.id;

  // multi date select state
  var Multidates = multiDate?.map((timestamp: any) => new Date(timestamp));
  // rage date select state
  var Rangedates = rageDate?.map((timestamp: any) => new Date(timestamp));
  const [showInModal, setShowInModal] = useState({
    dates: selectedValue == "single" ? multiDate : getAllDatesBetween(rageDate),
    status: false,
  });

  // ================ edit logic ================
  useEffect(() => {
    if (existingData) {
      setTextareaValue(existingData.comment);
      setTeamMember(existingData.teamMemberId?.id);
      setLeave(existingData.leaveType);
      setSelectedValue(existingData.dateType);

      if (existingData.dateType == "range") {
        setRangeDate(getStartDateEndDate(existingData.dates));
        setShowInModal({
          dates: existingData.dates,
          status: false,
        });
      } else {
        setMultiDate(existingData.dates);
        setShowInModal({
          dates: existingData.dates,
          status: false,
        });
      }
    }
  }, [existingData]);

  useEffect(() => {
    setShowInModal({
      dates:
        selectedValue == "single" ? Multidates : getAllDatesBetween(rageDate),
      status: true,
    });
  }, [open]);

  // ================ edit logic end ================

  // Options for the SelectComponent
  const selectOptions = {
    placeHolder: "Select an option",
    data: [
      { id: "single", title: "Select Individual Days" },
      { id: "range", title: "Select a Range" },
    ],
    name:"Date Type"
  };

  const selectOption = {
    placeHolder: "Select an option",
    data: [
      { id: "Sick", title: "Sick Leave" },
      { id: "Emergency", title: "Emergency Leave" },
      { id: "Casual", title: "Casual Leave" },
      { id: "Paid", title: "Paid Leave" },
      { id: "No", title: "No Call No Show" },
    ],
    name:"Leave Type"
  };

  const handleSelectChange = (value: any) => {
    setSelectedValue(value);
  };

  // formate data at create leave
  const formateData = {
    teamMemberId: isAdmin ? teamMember?.id : user.id,
    leaveType: leave,
    comment: textareaValue,
    dateType: selectedValue,
    dates:
      selectedValue == "single" ? Multidates : getAllDatesBetween(Rangedates),
  };

  const handleSubmit = () => {
    if (!formateData.comment.trim()) {
      alert.SnackbarHandler(true, "error", "Comment Required");
    } else {
      if (existingData) {
        updateLeave.handleUpdateLeave(existingData.id, formateData);
      } else {
        createLeave.handleCreateLeave(formateData);
      }
    }
  };

  // Options for autocomplete
  const options = data.map((item) => ({ title: item.name, id: item.id }));

  return (
    <>
      <SideDrawer
        headerHidden={true}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Leave Request"
      >
        <div className="px-6 py-4 sm:px-11">
          <PermissionAccess requiredPermissions={["manage_leave_request"]}>
            <div className="mb-2">
              <span>Select Team Member</span>
              <Autocomplete
                setValue={setTeamMember}
                value={teamMember}
                list={options}
                label={"Name"}
                placeholder="Name"
                useSideLabel={true}
              />
            </div>
          </PermissionAccess>

          <DropDownSelect
            data={selectOptions}
            value={selectedValue}
            setData={handleSelectChange}
          />
          <div className="mt-5 pb-4">
            {selectedValue == "single" && (
              <div className=" w-full input-container ">
                <h1 className="input-label ">Select Individual Dates</h1>
                <MultiDatePicker
                  setMultiDate={setMultiDate}
                  multiDate={multiDate}
                />
              </div>
            )}

            {selectedValue == "range" && (
              <div className=" w-full input-container ">
                <h1 className="input-label ">Select Date</h1>
                <RangeDatePicker value={rageDate} setValue={setRangeDate} />
              </div>
            )}
          </div>

          {selectedValue == "single" && (
            <Input
              borderline={true}
              className="mb-3 w-full] "
              label="Calculated Days"
              value={multiDate?.length}
              readOnly
              onClick={() => setOpen(true)}
            />
          )}

          {selectedValue == "range" && (
            <Input
              borderline={true}
              className="mb-3 w-full] "
              label="Calculated Days"
              value={getTotalDaysBetweenDates(Rangedates)}
              readOnly
              onClick={() => setOpen(true)}
            />
          )}

          <DropDownSelect
            data={selectOption}
            value={leave}
            setData={(e) => setLeave(e)}
          />

          <div className="w-full input-container mt-5">
            <label className="input-label">Comment</label>
            <textarea
              className="bg-[--brand-white-color] border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-[--brand-white-color] dark:border-gray-600 dark:placeholder-gray-400 dark:text-[--brand-white-color] dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="comment"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            />
          </div>

          <div className="my-4 text-center mt-7 ">
            <Button
              loading={globalLoading}
              onClick={handleSubmit}
              btnType="secondary"
              className="text-xs h-10 "
            >
              SUBMIT
            </Button>
          </div>
        </div>

        <ShowDatesModal
          open={open}
          setOpen={() => setOpen(false)}
          leaveDates={showInModal}
        />
      </SideDrawer>
    </>
  );
};
