import React from "react";
import {
  formatDateTable,
  formatTimestamp,
  formatTimeRange,
} from "@/utils/tools";
import LongMenu from "../LongMenu/LongMenu";
import Link from "next/link";
import {
  paymentHistoryMobileprops,
} from "@/interface/PaymentHistory";

const Paymentbooktable: React.FC<paymentHistoryMobileprops> = ({
  paymentdata,
  handleOptions,
  options,
  setAppointment,
}) => {

  const tableData: string[][] = [
    [
      "#",
      "CLIENT ON",
      "APPOINTMENT ON",
      "BOOKING DETAILS",
      "PAYMENT DETAILS",
      "CREATED ON",
      "ACTION",
    ],
  ];

  return (
    <>
      <table className="w-full overflow-hidden bg-[--brand-white-color] shadow-md  ">
        <thead className="h-5 font-bold bg-[--brand-pastel-color] text-[--brand-color] border border-[--brand-light-gray-color] ">
          <tr>
            {tableData[0].map((header, headerIndex) => (
              <th className="p-2 text-left" key={`header-${headerIndex}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paymentdata?.map((item: any, key: number) => {
            const id = item?.appointmentId.paymentId;

            const hasCollectPaymentOption =
              item.paymentStatus !== "paid" &&
              item.paymentStatus !== "refunded";
            const optionsForItem = options.filter(
              (i: any) => i.id !== "Collect payment" || hasCollectPaymentOption
            );

            return (
              <tr
                key={key}
                className="items-start border border-[--brand-light-gray-color]    "
              >
                <td key={key} className="px-3 py-3">
                  <p>{key + 1}</p>
                </td>

                <td key={key}>
                  <Link
                    href={`/payments/view-invoice/${id}`}
                    className="flex flex-col items-start "
                  >
                    <p className="text-blue-600 ">
                      {item.appointmentId.customerId.name}
                    </p>
                    <p className="text-blue-600 ">
                      {item.appointmentId.customerId.email}
                    </p>
                  </Link>
                </td>

                <td key={key} className="px-2 py-4">
                  <div className="flex flex-col items-start">
                    <p>
                      {formatDateTable(
                        item.appointmentId.date,
                        item.appointmentId.start_time_range,
                        item.appointmentId.end_time_range
                      )}
                    </p>
                    {/* {chips(item, item.appointmentId.date)} */}
                  </div>
                </td>

                <td key={key} className="px-3 py-3">
                  {item.appointmentId.bookings.map(
                    (booking: any, key: number) => {
                      return (
                        <div className="flex-col items-start pb-2 my-2">
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
                    }
                  )}
                </td>

                <td key={key} className="px-2">
                  <div className="flex-col items-start">
                    <p className="heading-title">
                      CAD$
                      {item?.payment !== null && item?.amount.total}
                    </p>

                    {item?.payment !== null &&
                      item?.payment?.paymentStatus == "pending" && (
                        <p className="text-[var(--redLabel-color)] font-bold">
                          <span>&#8226;</span> CAD$
                          {item?.payment !== null && item?.payment?.amount} -
                          UNPAID
                        </p>
                      )}
                    {item?.payment !== null &&
                      item?.payment?.paymentStatus == "paid" && (
                        <p className="text-[var(--green-color)] font-bold">
                          <span>&#8226;</span> CAD$
                          {item?.payment !== null && item?.payment?.amount} -
                          PAID
                        </p>
                      )}
                  </div>
                </td>

                <td key={key} className="px-2">
                  <div className="flex-col items-start">
                    <p>{formatTimestamp(item.createdAt)}</p>
                  </div>
                </td>

                <td
                  onClick={() =>
                    setAppointment([
                      {
                        ...item.appointmentId,
                        paymentId: { payment: item.payment },
                      },
                    ])
                  }
                  key={key}
                  className="px-3 py-3"
                >
                  <LongMenu
                    options={optionsForItem}
                    handleOptions={(options: any) =>
                      handleOptions(options, item)
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Paymentbooktable;
