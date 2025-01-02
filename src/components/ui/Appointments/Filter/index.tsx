"use client";
import React from "react";
import { Button, CircularProgress, Divider, Grid } from "@mui/material";
import ButtonCom from "@/components/ui/Button";
import DatePickerComponent from "@/components/ui/DatePicker";
import DropDownSelect from "@/components/ui/DropDownSelect";
import Modal from "@/components/ui/Modal";
import { FilterUIProps } from "@/interface/Appointments";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { PermissionAccess } from "@/middleware/PermissionAccess";

export default function FilterUI({
  searchFilter,
  resetFilter,
  serviceFilter,
  setServiceFilter,
  setPaymentStatusFilter,
  paymentStatusFilter,
  setAppointmentStatusFilter,
  appointmentStatusFilter,
  setDateFilter,
  dateFilter,
  setTeamMemberFilter,
  teamMemberFilter,
  serviceData,
  paymentStatus,
  appointmentStatus,
  teamMemberData,
  customerData,
  customerFilter,
  setCustomerFilter,
  setCheck,
  check,
}: FilterUIProps) {
  const [open, setOpen] = React.useState(false);
  const handleChangeOpen = () => {
    setOpen(false);
  };

  const handleSearch = () => {
    setCheck(false);
    searchFilter();
  };

  const handleReset = () => {
    resetFilter();
  };
  const resetData = [{ id: "N/A", title: "N/A" }];

  const renderFilterElements = () => (
    <>
      <div className="w-auto mx-1 ">
        <DatePickerComponent
          label="Appointment Date"
          setDateFilter={setDateFilter}
          values={dateFilter}
        />
      </div>
      <div className="w-auto mx-1 ">
        <DropDownSelect
          data={customerData}
          setData={setCustomerFilter}
          value={customerFilter}
          resetData={resetData}
        />
      </div>
      <div className="w-auto mx-1 ">
        <DropDownSelect
          data={serviceData}
          setData={setServiceFilter}
          value={serviceFilter}
          resetData={resetData}
        />
      </div>

      <PermissionAccess requiredPermissions={["manage_all_appointments"]}>
        <div className="w-auto mx-1 ">
          <DropDownSelect
            data={teamMemberData}
            setData={setTeamMemberFilter}
            value={teamMemberFilter}
            resetData={resetData}
          />
        </div>
      </PermissionAccess>

      <PermissionAccess requiredPermissions={["view_payments"]}>
        <div className="w-auto mx-1 ">
          <DropDownSelect
            data={paymentStatus}
            setData={setPaymentStatusFilter}
            value={paymentStatusFilter}
            resetData={resetData}
          />
        </div>
      </PermissionAccess>

      <div className="w-auto mx-1 ">
        <DropDownSelect
          data={appointmentStatus}
          setData={setAppointmentStatusFilter}
          value={appointmentStatusFilter}
          resetData={resetData}
        />
      </div>
    </>
  );

  const renderButtons = () => (
    <div className="flex items-baseline justify-between mt-3">
      {check ? (
        <ButtonCom
          loading={false}
          onClick={handleSearch}
          btnType="secondary"
          className="mt-[10px] mr-[10px] h-[40px]"
        >
          SEARCH
        </ButtonCom>
      ) : (
        <CircularProgress />
      )}
      <ButtonCom
        loading={false}
        onClick={handleReset}
        btnType="outline"
        className="mt-[10px] mr-[10px] h-[40px]"
      >
        RESET
      </ButtonCom>
    </div>
  );

  return (
    <div className="container-sub ">
      <div className="hidden lg:block">
        <Grid className="flex flex-wrap gap-2 items-center py-4 md:px-0 px-2 md:max-w-full max-w-[40vh] ">
          {renderFilterElements()}
          <div>{renderButtons()}</div>
        </Grid>
      </div>

      <div className="flex items-center justify-end lg:hidden ">
        <Modal
          customOpen={open}
          customClose={setOpen}
          target={
            <div className="lg:hidden block bg-[--brand-black-color] p-1 m-2 cursor-pointer">
              <FilterAltIcon className="text-[10px] text-[--brand-white-color]" />
            </div>
          }
        >
          <div>
            <div className="flex items-center justify-start ">
              <div className="pb-2">
                <Button onClick={handleChangeOpen}>
                  {" "}
                  <ClearOutlinedIcon />
                </Button>
              </div>
            </div>
            <Divider />
            <div className="p-4">{renderFilterElements()}</div>
            <Divider />
            <div className="flex items-baseline justify-between mt-0 m-3 ">
              {renderButtons()}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
