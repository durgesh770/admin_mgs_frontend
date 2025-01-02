import React from "react";
import LongMenu from "../../LongMenu/LongMenu";

import Chip from "../../Chip";

interface ViewHeaderInterface {
  client: {
    name: string;
  };
  appointment: {
    date: string;
    start_time: string;
    status: any;
  };

  payment: {
    status: string;
  };

  handleOptions: any;
  options: any;
  timestamp: string;

  appointmentDetails?: any;
}

const ViewHeaderUI = ({
  client,
  appointment,
  payment,
  handleOptions,
  options,
  timestamp,
  appointmentDetails,
}: ViewHeaderInterface) => {
  return (
    <>
      <div className="w-full p-2 rounded-lg shadow-md sm:p-4 border border-[--brand-disabled-white-color]">
        <div className="items-start justify-between block lg:flex ">
          <div>
            <div>
              <span className="font-extrabold sm:text-xl text-md">
                Client Name:{" "}
              </span>
              <span className="font-semibold sm:text-xl text-md">
                {client.name}
              </span>
            </div>
            <div className="pt-2">
              <span className="font-bold">Date:</span>
              <span className="px-2">{appointment.date}</span>
              <span className="font-bold">Time</span>
              <span> {appointment.start_time}</span>
            </div>
          </div>

          <div className="flex justify-between gap-12">
            <div className="justify-center block gap-12 lg:flex">
              <div className="pt-2 lg:pt-0">
                <div className="pb-3">
                  <span>Appointment status</span>
                </div>
                <div className="justify-center block gap-2 lg:flex ">
                  {appointment.status}
                </div>
              </div>

              <div className="pt-2 lg:pt-0">
                <div className="pb-3">
                  <span>Payment Status</span>{" "}
                </div>
                {payment.status == "paid" ? (
                  <Chip backgroundColor={"green"} label="PAID" />
                ) : payment.status == "pending" ? (
                  <Chip backgroundColor={"red"} label="PENDING" />
                ) : (
                  payment.status == "refunded" && (
                    <Chip backgroundColor={"red"} label="REFUNDED" />
                  )
                )}
              </div>
            </div>

            <div className="pt-4 sm:pt-0" >
              <LongMenu options={options} handleOptions={handleOptions} />
            </div>
          </div>
        </div>

        <div className="items-start justify-end block md:flex">
          <div className="pt-2 pr-6 sm:pt-8">
            <span>Time Stamp </span>
            <p>{timestamp}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHeaderUI;
