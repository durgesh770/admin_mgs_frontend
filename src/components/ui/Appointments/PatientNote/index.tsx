import Modal from "@/components/ui/Modal";
import { chips, formatDateTable, formatTimeRange } from "@/utils/tools";
import * as React from "react";
import RescheduleRequestUI from "../RescheduleRequest";
import { Button, Grid } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

interface PatientNoteUI {
  item: any;
}

export default function PatientNoteUI({ item }: PatientNoteUI) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="mb-5 mx-0 md:mx-2">
        <div className="m-1 mb-1 border-b border-solid border-gray-500 pb-5">
          <p className="font-bold mb-1">APPOINTMENT ON</p>

          <p className="mb-1">
            {formatDateTable(
              item.date,
              item.start_time_range,
              item.end_time_range
            )}
          </p>
          {/* {chips(item, item.date)} */}
          {item.reschedule != undefined && chips(item.reschedule, item.date)}
          {item?.reschedule?.status == "change_request" && (
            <Modal
              customOpen={open}
              customClose={setOpen}
              target={
                <p className="underline cursor-pointer">
                  View Reschedule Request
                </p>
              }
            >
              <RescheduleRequestUI
                setOpen={setOpen}
                comment={item?.reschedule}
              />
            </Modal>
          )}
        </div>

        <div className="m-1 mt-2 mb-1 border-b border-solid border-gray-500 pb-5">
          <p className="font-bold mb-1">BOOKING DETAILS</p>
          {item.bookings.map((booking: any, key: any) => {
            return (
              <div className="items-start flex-col ">
                <p className="heading-title">
                  {key + 1}. {booking.serviceName}
                </p>
                <p className="pl-2">- {booking.teamMemberName}</p>
                <p className="pl-2">
                  - {formatTimeRange(booking.start_time, booking.end_time)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="m-1 mt-2 mb-1 pb-5">
          <p className="font-bold mb-1">PATIENT NOTE</p>
          <p className="pl-2 mb-1 break-words">{item?.notes?.description}</p>
        </div>
      </div>
    </>
  );
}
