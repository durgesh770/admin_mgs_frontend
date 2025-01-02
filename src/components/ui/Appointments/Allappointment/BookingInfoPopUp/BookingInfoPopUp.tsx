"use client";
import LongMenu from "@/components/ui/LongMenu/LongMenu";
import RescheduleRequestUI from "../../RescheduleRequest";
import Modal from "@/components/ui/Modal";
import {
  chips,
  formatDateTable,
  formatTimeRange,
  formatTimestamp,
} from "@/utils/tools";
import { useState } from "react";
import {
  AppointmentPayment,
  appointmentActionOptions,
} from "@/hooks/Appointment/hooks";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { PermissionAccess } from "@/middleware/PermissionAccess";
import moment from "moment";

interface BookingInfoprops {
  item: any;
  handleOptions: any;
  index: number;
}

export default function BookingInfoPopUp({
  index,
  item,
  handleOptions,
}: BookingInfoprops) {
  const [open, setOpen] = useState(false);
  const { permissions } = useAuth();
  const { paidAmount, unpaidAmount } = AppointmentPayment(item.paymentId);

  return (
    <div className="px-4 pt-4 mx-0 h-[80vh] overflow-auto mb-6 shadow-lg md:mx-2 bg-[--brand-white-color] border border-gray-300">
      <div className="pb-5 m-1 mb-1 border-b border-gray-500 border-solid">
        <p className="flex items-center justify-between mb-1 font-bold">
          <p className="flex items-center mb-1 font-bold">
            <div>#</div>
            <div>{index + 1}</div>
          </p>
          <div>
            <LongMenu
              options={appointmentActionOptions(
                item.status,
                item?.paymentId?.paymentStatus == "pending",
                item.notes,
                permissions
              )}
              handleOptions={(option: any) =>
                handleOptions(item.id, option, item.paymentId.id)
              }
            />
          </div>
        </p>
      </div>

      <div className="pb-5 m-1 mt-2 mb-1 border-b border-gray-500 border-solid ">
        <p className="mb-1 font-bold">CLIENT ON</p>
        <Link
          href={`/appointments/view/${item?.paymentId?.appointmentId}`}
          className="flex flex-col items-start "
        >
          <p className="text-blue-600 ">{item.name}</p>
          <p className="text-blue-600 ">{item.email}</p>
        </Link>
      </div>

      <div className="pb-5 m-1 mb-1 border-b border-gray-500 border-solid">
        <div>APPOINTMENT ON</div>

        <p className="mb-1">
          {formatDateTable(
            item.date,
            item.start_time_range,
            item.end_time_range
          )}
        </p>
        <div className="flex flex-col gap-2 my-2 w-fit">
          {chips(item, item.date)}
        </div>
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
            <RescheduleRequestUI setOpen={setOpen} comment={item?.reschedule} />
          </Modal>
        )}
      </div>

      <PermissionAccess requiredPermissions={["view_payments"]}>
        <div className="pb-5 m-1 mt-2 mb-1 border-b border-gray-500 border-solid">
          <p className="heading-title">
            CAD${item?.paymentId !== null && item?.paymentId?.amount?.total}
          </p>

          <ul>
            {item?.paymentId !== null &&
              item?.paymentId?.payment?.paymentStatus === "pending" && (
                <li className="text-[var(--redLabel-color)] font-bold">
                  <span>&#8226;</span> CAD$
                  {item?.paymentId !== null && unpaidAmount} - UNPAID
                </li>
              )}
            {item?.paymentId !== null &&
              item?.paymentId?.payment?.paymentStatus === "paid" && (
                <li className="text-[var(--green-color)] font-bold">
                  <span>&#8226;</span> CAD$
                  {paidAmount}-PAID
                </li>
              )}
          </ul>
        </div>
      </PermissionAccess>

      <div className="pb-5 m-1 mt-2 mb-1 border-b border-gray-500 border-solid">
        <p className="mb-1 font-bold">BOOKING DETAILS</p>
        {item.bookings.map((booking: any, key: number) => {
          return (
            <div className="flex-col items-start">
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

      <div className="pb-5 m-1 mt-2 mb-1">
        <p className="mb-1 font-bold">APPOINTMENT ON CREATED ON</p>
        <p>{moment(item.createdAt).format("MMMM DD, YYYY, h:mm A")}</p>
      </div>
    </div>
  );
}
