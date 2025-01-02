"use client";
//react
import React, { useEffect, useState } from "react";
import ViewDetailsCards from "./PayrollCards";
import JobViewDetailsTable from "./PayrollTablefeature";
import { Grid } from "@mui/material";
import Button from "@/components/ui/Button";
import { Add } from "./AddPayrolls/AddPayrollDrawer";
import { PermissionAccess } from "@/middleware/PermissionAccess";
//hook
import { getTeamMembers } from "@/hooks/TeamMembers";
import { useGetTimeTracker } from "@/hooks/TimeTracker";
import DropDownSelect from "@/components/ui/DropDownSelect";
import { useAuth } from "@/context/AuthContext";

export const ManagePayrollfeature = () => {
  // integration
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const { timeData, setPage, refetch, refetchCounter } =
    useGetTimeTracker(setParams, params);
    
  const { data } = getTeamMembers();
  // permission
  const { permissions } = useAuth();
  let manage_payroll = permissions.includes("manage_payroll");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [team, setTeamMember] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [fields, setFields] = useState<any[]>([
    {
      startTime: 1400,
      endTime: 1500,
      workedType: "Appointment",
      reference: "",
      duration: 60,
    },
  ]);
  // this state used in table component store data of three dot btn
  const [currentbtn, setCurrentbtn] = useState({
    currentOptions: -1,
    id: { id: "" },
  });

  const toggleDrawer = () => {
    setSelectedValue("");
    setDateFilter("");
    setFields([
      {
        startTime: 1400,
        endTime: 1500,
        workedType: "Appointment",
        reference: "",
        duration: 60,
      },
    ]);
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (team.trim()) {
      setParams((prev) => ({
        ...prev,
        teamMemberId: team,
      }));
    }
  }, [team]);

  const dropdownData = {
    placeHolder: "Select Team Member",
    data: data.map((item: any) => ({ id: item.id, title: item.name })),
    name: "Team Member",
  };

  return (
    <>
      <div className="bg-[--brand-white-color] border border-[--brand-light-gray-color] m-auto  md:p-5 xl:w-fit min-h-screen">
        <Grid>
          <div className="flex flex-row items-center justify-center mt-3">
            <h1 className="mb-8 font-bold  md:text-[2rem] text-[1.5rem] ">
              Manage Payroll
            </h1>
          </div>
          <div className="">
            <ViewDetailsCards />
          </div>

          <div className="flex flex-row justify-between mt-12 mr-5 items-center ">
            <div>
              {manage_payroll && (
                <DropDownSelect
                  data={dropdownData}
                  setData={(selectedValue: any) => setTeamMember(selectedValue)}
                  value={team}
                />
              )}
            </div>
            <PermissionAccess requiredPermissions={["create_payroll"]}>
              <div>
                <Button
                  loading={false}
                  onClick={toggleDrawer}
                  btnType={"secondary"}
                >
                  Add
                </Button>
              </div>

              <Add
                toggleDrawer={toggleDrawer}
                drawerOpen={drawerOpen}
                setSelectedValue={setSelectedValue}
                selectedValue={selectedValue}
                dateFilter={dateFilter}
                fields={fields}
                setFields={setFields}
                setDateFilter={setDateFilter}
                currentbtn={currentbtn}
                refetch={refetch}
              />
            </PermissionAccess>
          </div>

          <div className="mt-5">
            <JobViewDetailsTable
              setDrawerOpen={setDrawerOpen}
              setFields={setFields}
              setDateFilter={setDateFilter}
              setSelectedValue={setSelectedValue}
              setCurrentbtn={setCurrentbtn}
              currentbtn={currentbtn}
              setPage={setPage}
              data={timeData}
              refetch={refetch}
              refetchCounter={refetchCounter}
            />
          </div>
        </Grid>
      </div>
    </>
  );
};
