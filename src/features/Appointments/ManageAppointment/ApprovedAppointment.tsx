"use client";
import Switch from "@/components/ui/Switch";
import FilterFeature from "../FilterFeature";
import AllappointmentTable from "@/components/ui/Appointments/Allappointment/AllappointmentTable";
import BookingInfoPopUp from "@/components/ui/Appointments/Allappointment/BookingInfoPopUp/BookingInfoPopUp";
import { useState } from "react";
import FullCalendarView from "@/components/ui/Calendar";
import PaginationFeature from "../PaginationFeature/PaginationFeature";
import { formatAppointmentDataIntoCalander } from "@/hooks/Appointment/hooks";
import Modal from "@/components/ui/Modal";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

interface ManageAppointmentprops {
  approvedBooking: any;
  columns: any;
  handleOptions?: any;
  setQuery?: any;
  check: boolean;
  setCheck: any;
}

export default function ManageApprovedAppointment({
  approvedBooking,
  columns,
  handleOptions,
  setQuery,
  check,
  setCheck,
}: ManageAppointmentprops) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const events = formatAppointmentDataIntoCalander(approvedBooking);

  const handleSwitchChange = () => {
    !view ? setView(true) : setView(false);
  };

  const [selectedAppointment, setselectedAppointment] = useState();
  const handleEventClick = (event: any) => {
    setselectedAppointment(event?.event?.extendedProps?.data?.other);
    setOpen(true);
  };
  return (
    <>
      <div className="pb-4 container-full">
        <div className="flex items-center justify-start py-5 break-words container-sub md:px-0 text-[--brand-color]">
          <h4 className="mulish">TABULAR VIEW</h4>
          <div className="mx-5">
            <Switch onChange={handleSwitchChange} />
          </div>
          <h4 className="mulish">CALENDAR VIEW</h4>
        </div>
        <FilterFeature
          check={check}
          setCheck={setCheck}
          setData={(filter: any) => {
            setQuery({
              query_services: filter.serviceFilter,
              query_teams: filter.teamMemberFilter,
              status: filter.appointmentStatusFilter,
              payment_status: filter.paymentStatusFilter,
              date: filter.dateFilter,
              query_customers: filter.customerFilter,
            });
          }}
        />
      </div>

      {!view ? (
        <div className="container-sub">
          {/* desktop view */}
          <div className="hidden overflow-auto lg:block">
            <AllappointmentTable
              rows={approvedBooking}
              columns={columns}
              handleOptions={handleOptions}
            />
          </div>
          {/* mobile view */}
          <div className="block lg:hidden">
            {approvedBooking.map((item: any, key: number) => {
              return (
                <BookingInfoPopUp
                  key={key}
                  index={key}
                  item={item}
                  handleOptions={handleOptions}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <FullCalendarView
          events={events}
          handleEventClick={handleEventClick}
          open={open}
          setOpen={setOpen}
        />
      )}

      {open && (
        <Modal customOpen={open} customClose={setOpen}>
          <div
            className="float-right mb-5 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <ClearOutlinedIcon />
          </div>

          <BookingInfoPopUp
            index={0}
            item={selectedAppointment}
            handleOptions={handleOptions}
          />
        </Modal>
      )}
    </>
  );
}