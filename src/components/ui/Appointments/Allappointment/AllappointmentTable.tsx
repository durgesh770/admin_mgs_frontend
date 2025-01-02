"use client";
import {
  chips,
  formatDateTable,
  formatTimeRange,
  formatTimestamp,
} from "@/utils/tools";
import { useState } from "react";
import Modal from "../../Modal";
import RescheduleRequestUI from "../RescheduleRequest";
import LongMenu from "../../LongMenu/LongMenu";
import {
  AppointmentPayment,
  appointmentActionOptions,
} from "@/hooks/Appointment/hooks";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { PermissionAccess } from "@/middleware/PermissionAccess";
import moment from "moment";

interface Column {
  id: any;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface Amount {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

interface Booking {
  amount: Amount;
  serviceId: string;
  serviceName: string;
  teamMemberId: string;
  teamMemberName: string;
  start_time: number;
  end_time: number;
  minutes: number;
  _id: string;
}

interface Payment {
  amount: number;
  paymentStatus: string;
  methodType: string;
  paymentMethod: string;
  paymentRefNo: string;
  paymentDate: string;
  _id: string;
}

interface AdvancePayment {
  amount: number;
  paymentStatus: string;
  methodType: string;
  paymentMethod: string;
  paymentRefNo: string;
  paymentDate: string;
  _id: string;
}

interface PaymentInfo {
  amount: Amount;
  customerId: string;
  appointmentId: string;
  paymentType: string;
  paymentStatus: string;
  payment: Payment;
  createdAt: string;
  updatedAt: string;
  advancePayment: AdvancePayment;
  payments: Payment[];
  id: string;
}

interface Reschedule {
  status: string;
  comment: string;
}

interface InvoiceData {
  id: string;
  name: string;
  customerId: string;
  email: string;
  amount: Amount;
  date: string;
  start_time_range: number;
  end_time_range: number;
  bookings: Booking[];
  status: string;
  createdAt: string;
  updatedAt: string;
  paymentId: PaymentInfo;
  notes: boolean;
  reschedule: Reschedule;
}

interface AllappointmentTableProps {
  columns: readonly Column[];
  rows: InvoiceData[];
  handleOptions: any;
}

const AllappointmentTable: React.FC<AllappointmentTableProps> = ({
  columns,
  rows,
  handleOptions,
}) => {
  const [open, setOpen] = useState(false);
  const { permissions } = useAuth();

  return (
    <>
      <table className="w-full overflow-hidden bg-[--brand-white-color] shadow-md ">
        <thead className="h-5 font-bold bg-[--brand-pastel-color] text-[--brand-color] border border-[--brand-light-gray-color] ">
          <tr>
            {columns
              .filter((col) =>
                col.id == "payment"
                  ? permissions.includes("view_payments")
                  : true
              )
              .map((header, headerIndex: any) => (
                <th className="p-2 text-left" key={`header-${headerIndex}`}>
                  {header.label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((item, key) => {
            const { paidAmount, unpaidAmount } = AppointmentPayment(
              item.paymentId
            );
            return (
              <tr
                key={key}
                className="items-start border border-[--brand-light-gray-color]    "
              >
                <td key={key} className="px-3 py-5">
                  <p>{key + 1}</p>
                </td>

                <td key={key}>
                  <Link
                    href={`/appointments/view/${item?.paymentId?.appointmentId}`}
                    className="flex flex-col items-start "
                  >
                    <p className="text-blue-600 ">{item.name}</p>
                    <p className="text-blue-600 ">{item.email}</p>
                  </Link>
                </td>

                <td key={key} className="px-3 py-5 ">
                  <div className="flex flex-col items-start ">
                    <p>
                      {formatDateTable(
                        item.date,
                        item.start_time_range,
                        item?.end_time_range
                      )}
                    </p>
                    <div className="flex flex-col gap-2 my-2">
                      {chips(item, item.date)}
                    </div>
                    {item.reschedule != undefined &&
                      chips(item.reschedule, item.date)}

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
                          comment={item?.reschedule.comment}
                        />
                      </Modal>
                    )}
                  </div>
                </td>

                <td key={key} className="px-3 py-5">
                  {item.bookings.map((booking, key) => {
                    return (
                      <div className="flex-col items-start my-2">
                        <p className="heading-title">
                          {key + 1}. {booking.serviceName}
                        </p>
                        <p className="pl-2">- {booking.teamMemberName}</p>
                        <p className="pl-2">
                          -{" "}
                          {formatTimeRange(
                            booking.start_time,
                            booking.end_time
                          )}
                        </p>
                      </div>
                    );
                  })}
                </td>

                <PermissionAccess requiredPermissions={["view_payments"]}>
                  <td key={key} className="px-3 py-5">
                    <div className="flex flex-col items-start">
                      {!item.paymentId ? (
                        <p className="text-[var(--redLabel-color)] font-bold">
                          Payment Pending
                        </p>
                      ) : (
                        <>
                          <p className="heading-title">
                            CAD$
                            {item?.paymentId !== null &&
                              item?.paymentId?.amount?.total}
                          </p>
                          {item?.paymentId !== null &&
                            item?.paymentId?.payment?.paymentStatus ==
                              "pending" && (
                              <p className="text-[var(--redLabel-color)] font-bold">
                                <span>&#8226;</span> CAD$
                                {item?.paymentId !== null && unpaidAmount} -
                                UNPAID
                              </p>
                            )}
                          {item?.paymentId !== null &&
                            item?.paymentId?.payment?.paymentStatus ==
                              "paid" && (
                              <p className="text-[var(--green-color)] font-bold">
                                <span>&#8226;</span> CAD$
                                {item?.paymentId !== null && paidAmount} - PAID
                              </p>
                            )}
                        </>
                      )}
                    </div>
                  </td>
                </PermissionAccess>

                <td key={key} className="px-3 py-5">
                  <div className="flex flex-col items-start ">
                    <p>{moment(item.createdAt).format("DD MMM YYYY, h:mm A")}</p>
                  </div>
                </td>

                <td key={key} className="px-3 py-5">
                  <div className="flex flex-col items-start w-full gap-5">
                    <LongMenu
                      options={appointmentActionOptions(
                        item.status,
                        item?.paymentId?.paymentStatus == "pending",
                        item.notes,
                        permissions,
                        item
                      )}
                      handleOptions={(option: any) =>
                        handleOptions(item.id, option, item.paymentId.id)
                      }
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AllappointmentTable;
