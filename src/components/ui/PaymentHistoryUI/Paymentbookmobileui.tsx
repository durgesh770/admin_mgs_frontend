import Link from "next/link";

// utils
import {
  chips,
  formatDateTable,
  formatTimeRange,
  formatTimestamp,
} from "@/utils/tools";

// component
import LongMenu from "../LongMenu/LongMenu";

// interface
import { Paymenthistoryprops } from "@/interface/PaymentHistory";

export default function PaymentbookmobileUI({
  item,
  index,
  handleOptions,
  options,
  setAppointment
}: Paymenthistoryprops) {

  const hasCollectPaymentOption =
    item.paymentStatus !== "paid" && item.paymentStatus !== "refunded";
  const optionsForItem = options.filter(
    (i: any) => i.id !== "Collect payment" || hasCollectPaymentOption
  );

  return (
    <>
      <div className="px-4 pt-4 mx-0 mb-6 shadow-lg md:mx-2 bg-[--brand-white-color] border border-gray-300">
        <div className="pb-5 m-1 mb-1 border-b border-gray-500 border-solid">
          <p className="flex items-center justify-between mb-1 font-bold">
            <p className="flex items-center mb-1 font-bold">
              <div>#</div>
              <div>{index + 1}</div>
            </p>
            <div
              onClick={() =>
                setAppointment([
                  {
                    ...item.appointmentId,
                    paymentId: { payment: item.payment },
                  },
                ])
              }
            >
              <LongMenu
                options={optionsForItem}
                handleOptions={(options: any) => handleOptions(options, item)}
              />
            </div>
          </p>
        </div>

        <div className="pb-5 m-1 mt-2 mb-1 border-b border-gray-500 border-solid ">
          <p className="mb-1 font-bold">CLIENT ON</p>
          <Link
            href={`/payments/view-invoice/${item?.appointmentId.id}`}
            className="flex flex-col items-start "
          >
            <p className="text-blue-600 ">
              {item.appointmentId.customerId.name}
            </p>
            <p className="text-blue-600 ">
              {item.appointmentId.customerId.email}
            </p>
          </Link>
        </div>
        <div className="pb-5 m-1 mb-1 border-b border-gray-500 border-solid">
          <p className="flex items-center justify-between mb-1 font-bold">
            <p className="mb-1 font-bold">APPOINTMENT ON</p>
          </p>
          <p className="mb-1">
            {formatDateTable(
              item.appointmentId.date,
              item.appointmentId.start_time_range,
              item.appointmentId.end_time_range
            )}
          </p>
          {chips(item, item.appointmentId.date)}
        </div>

        <div className="pb-5 m-1 mt-2 mb-1 border-b border-gray-500 border-solid">
          <p className="heading-title">
            CAD${item?.payment !== null && item?.payment.amount}
          </p>

          <ul>
            {item?.payment !== null &&
              item?.payment?.paymentStatus === "pending" && (
                <li className="text-[var(--redLabel-color)] font-bold">
                  <span>&#8226;</span> CAD$
                  {item?.payment !== null && item?.payment?.amount} - UNPAID
                </li>
              )}
            {item?.payment !== null &&
              item?.payment?.paymentStatus === "paid" && (
                <li className="text-[var(--green-color)] font-bold">
                  <span>&#8226;</span> CAD$
                  {item?.payment !== null && item?.payment?.amount} - PAID
                </li>
              )}
          </ul>
        </div>

        <div className="pb-5 m-1 mt-2 mb-1 border-b border-gray-500 border-solid">
          <p className="mb-1 font-bold">BOOKING DETAILS</p>
          {item.appointmentId.bookings.map((booking: any, key: number) => {
            return (
              <div className="flex-col items-start pb-4">
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
          <p>{formatTimestamp(item.createdAt)}</p>
        </div>
      </div>
    </>
  );
}
