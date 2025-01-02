import Button from "@/components/ui/Button";
import moment from "moment";
import React from "react";


import { useActionHooks } from "@/hooks/Appointment/ActionHooks";
import CollectPaymentModal from "@/features/Appointments/AppointmentsPopup/CollectPayment";

export const Billto = ({ data }: any) => {

  let appointment = { ...data?.appointmentId, paymentId: data?.paymentId };

  const {
    collectPayment,
    setCollectPayment,
    handleActionClick,
  } = useActionHooks({ appointments: [appointment] });

  return (
    <>
      <div className="p-1 pl-5 mt-4 input-label">
        {" "}
        <div className="text-[--brand-color]">BILL TO</div>
      </div>
      <div className="flex-row justify-between pt-2 m-2 bg-white border border-gray-200 sm:m-5 sm:p-2 md:flex ">
        <div className="bg-[--brand-pastel-color]  md:w-full p-4 m-2 border border-gray-200 input-label ">
          <div className="pt-3">FULL NAME</div>
          <div className="text-[--brand-color] pt-1">
            {data.customerId?.name || "Not Available"}
          </div>
          <div className="pt-4">EMAIL ADDRESS</div>
          <div className="text-[--brand-color] pt-1 ">
            {data.customerId?.email || "Not Available"}
          </div>
          <div className="pt-4">PHONE NUMBER</div>
          <div className="text-[--brand-color] pt-1">
            {data.customerId?.telephone}
          </div>
          <div className="pt-4 ">ADDRESS</div>
          <div className="text-[--brand-color] pt-1">
            123st, ABC Avenue, Calgary, T1W - T4B, Canado
          </div>
        </div>

        <div className="grid w-full pr-2 m-0">
          <div className="flex justify-end">
            {data.paymentId?.paymentStatus == "paid" && (
              <div>
                <Button loading={false} className=" h-[40px] mt-2  " btnType="outline">
                  PAID IN FULL
                </Button>
              </div>
            )}
            {data.paymentId?.paymentStatus == "pending" && (
              <div>
                <Button
                  loading={false}
                  className=" h-[40px]"
                  btnType="secondary"
                  onClick={() => {
                    handleActionClick(data.appointmentId?.id, { id: "collect-payment" })
                  }}
                >
                  Pay Pending
                </Button>
              </div>
            )}
            {data.paymentId?.paymentStatus == "refunded" && (
              <div>
                <Button loading={false} className=" h-[40px]  mt-2  " btnType="red">
                  REFUNDED
                </Button>
              </div>
            )}
          </div>
          <div className="flex justify-end pt-40 input-label ">
            <div>
              <div className="float-right ">
                <span className="text-[--brand-color]  ">INVOICE N0: </span>
                <span className="font-semibold ">
                  {data?.invoiceNo || "Not Available"}
                </span>
              </div>
              <div className=" pt-7">
                <span className="text-[--brand-color]">INVOICE DATE: </span>
                <span className="font-semibold ">
                  {moment(data?.invoiceDate).format("DD MMM YYYY") ||
                    "Not Available"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {collectPayment.open && (
        <CollectPaymentModal
          open={collectPayment.open}
          setOpen={() => setCollectPayment((old) => ({ ...old, open: false }))}
          customerId={collectPayment.customerId}
          appointmentId={collectPayment.appointmentId}
          amount={collectPayment.amount}
          appointmentData={collectPayment.appointmentData}

        />
      )}
    </>
  );
};
