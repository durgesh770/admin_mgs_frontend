//react
import React, { useEffect } from "react";

import { AddTime } from "../../../components/ui/ManagePayrollUI/AddTime";
//hook
import { useCreateTime, useUpdateDataTimeTracker } from "@/hooks/TimeTracker";
import { getTeamMembers } from "@/hooks/TeamMembers";
import { useSnackbar } from "@/context/GlobalContext";
import SideDrawer from "@/components/ui/SideDrawer";
import DatePickerComponent from "@/components/ui/DatePicker";
import DropDownSelect from "@/components/ui/DropDownSelect";

interface AddExpenseProps {
  toggleDrawer: () => void;
  drawerOpen: boolean;
  setSelectedValue: any;
  selectedValue: string;
  dateFilter: string;
  fields: any;
  setFields: any;
  setDateFilter: any;
  currentbtn: any;
  refetch: any;
}

export const Add = ({
  toggleDrawer,
  drawerOpen,
  setSelectedValue,
  selectedValue,
  fields,
  dateFilter,
  setFields,
  setDateFilter,
  currentbtn,
  refetch,
}: AddExpenseProps) => {
  // add team  members
  const { data } = getTeamMembers();
  const { handleUpdate, loader } = useUpdateDataTimeTracker();
  const alert = useSnackbar();
  const { handleCreateTime, loading } = useCreateTime();
  const globalLoader = !loading ? loading : loader;

  const dropdownData = {
    placeHolder: "Select Team Member",
    data: data.map((item) => ({ id: item.id, title: item.name })),
    name: "Team Member",
  };

  const handleSelectChange = (selectedValue: any) => {
    setSelectedValue(selectedValue);
  };

  const handleSubmitbtn = () => {
    const formateData = {
      teamMemberId: selectedValue,
      date: dateFilter,
      hours: fields,
    };

    const isTaskEmpty = fields.some(
      (field: any) => field.workedType.trim() == ""
    );
    if (isTaskEmpty) {
      alert.SnackbarHandler(true, "error", "Task is Required");
    } else if (!selectedValue.trim()) {
      alert.SnackbarHandler(true, "error", "Team Member is Required");
    } else if (currentbtn.currentOptions == 1) {
      handleUpdate(currentbtn.id.id, formateData, refetch, toggleDrawer);
    } else {
      handleCreateTime(formateData, refetch);
    }
  };

  // use for side drawer close automatic after click to button
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        toggleDrawer();
      }, 2000);
    }
  }, [loading]);

  return (
    <>
      <SideDrawer
        headerHidden={true}
        open={drawerOpen}
        onClose={() => toggleDrawer()}
        title="Add Custom Data"
        customWidth={false}
      >
        <div className="px-6 py-4 sm:px-11">
          <DatePickerComponent
            setDateFilter={setDateFilter}
            values={dateFilter}
            label={"Select Date"}
          />
          <div className={`my-5 `}>
            <DropDownSelect
              data={dropdownData}
              setData={handleSelectChange}
              value={selectedValue}
            />
          </div>
          <AddTime
            activebtn={true}
            setFields={setFields}
            fields={fields}
            handleSubmitbtn={handleSubmitbtn}
            loading={globalLoader}
          />
        </div>
      </SideDrawer>
    </>
  );
};
