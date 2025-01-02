import { Divider } from "@mui/material";
import React from "react";
import moment from "moment";
import { areAllElementsUnique, formatTime } from "@/utils/tools";
import { getPastAppointments } from "@/hooks/Customer";
import { MdHistory } from "react-icons/md";
import Link from "next/link";

// interface for props
interface UpComingAppointmentsProps {
  customerId: string;
}

const PastAppointments = ({ customerId }: UpComingAppointmentsProps) => {
  const appointments = getPastAppointments(customerId);

  return (
    appointments.data.results.length > 0 && (
      <>
        <div className="cardsCss">
          <div className="pb-3">
            <span className="text-lg font-extrabold">Past Appointments</span>
          </div>
          <Divider />

          {appointments.data.results.map((item) => {
            const formattedDate = moment(item.date).format("ddd, DD MMM YYYY");
            const startTime = formatTime(item.start_time_range);

            const title: any[] = item.bookings.map(
              (book: any) => book.serviceName
            );
            const memberIds = item.bookings.map(
              (book: any) => book.teamMemberId
            );
            const member =
              memberIds.length > 1 && areAllElementsUnique(memberIds)
                ? "multiple"
                : "single";
            return (
              <div className="">
                <div className="pt-4">
                  {title.map((tit, index) => (
                    <p className="text-sm font-extrabold">
                      {index} {tit}
                    </p>
                  ))}
                </div>

                <div className="flex items-start justify-between py-3">
                  <div>
                    <p className="text-sm lebleCss ">
                      {formattedDate} {startTime}
                    </p>
                    <p className="text-sm lebleCss ">
                      with {member} staff members
                    </p>
                  </div>
                  <Link href={`/payments/view-invoice/${item.id}`}>
                    <MdHistory size={20} />
                  </Link>
                </div>

                <Divider />
              </div>
            );
          })}

          {appointments.showLoadMore && (
            <button
              onClick={appointments.loadMore}
              className="my-2 font-semibold text-left text-blue-500"
            >
              See More
            </button>
          )}
        </div>
      </>
    )
  );
};

export default PastAppointments;
