import { Divider } from "@mui/material";
import React from "react";
import Button from "../../Button";
import moment from "moment";
import { areAllElementsUnique, formatTime } from "@/utils/tools";
import { getUpcomingAppointments } from "@/hooks/Customer";
import EventIcon from "@mui/icons-material/Event"; // Import Event icon from Material-UI
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PermissionAccess } from "@/middleware/PermissionAccess";

// interface for props
interface UpComingAppointmentsProps {
  customerId: string;
}

const UpComingAppointments = ({ customerId }: UpComingAppointmentsProps) => {
  const appointments = getUpcomingAppointments(customerId);
  const router = useRouter();

  const handleRelocate = () => {
    router.push("/appointments/create-appointment");
  };

  return (
    <>
      <div className="cardsCss">
        <div className="pb-3">
          <span className="text-lg font-extrabold">Upcoming Appointments</span>
        </div>
        <Divider />

        {appointments.data.results.map((item) => {
          const formattedDate = moment(item.date).format("ddd, DD MMM YYYY");
          const startTime = formatTime(item.start_time_range);

          const title: any[] = item.bookings.map(
            (book: any) => book.serviceName
          );
          const memberIds = item.bookings.map((book: any) => book.teamMemberId);
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
                <Link href={`/appointments/view/${item?.id}`}>
                  <EventIcon className="w-3 h-3" />
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

        <PermissionAccess requiredPermissions={["create_appointments"]} >

          <div onClick={handleRelocate} className="pt-4">
            <Button loading={false} btnType="secondary">Book Appointment</Button>
          </div>

        </PermissionAccess>

      </div>
    </>
  );
};

export default UpComingAppointments;
