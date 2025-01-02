import { AppointmentPayment } from "@/hooks/Appointment/hooks";
import React from "react";

const PaymentDetails = ({ data }: any) => {
  let payment = data?.paymentId;
  const { paidAmount, unpaidAmount } = AppointmentPayment(payment);

  return (
    <>
      <div className="w-full my-6">
        <p className="text-lg font-bold">Payment Information</p>
        <div className="grid p-4 bg-[--brand-white-color] rounded-lg shadow-md lg:grid-cols-3 sm:grid-cols-1" >
          <div className="py-2">
            <h5 className="font-bold text-md ">Paid Amount</h5>
            <p className="text-[var(--green-color)]">CAD ${paidAmount}</p>
          </div>

          {unpaidAmount > 0 && <div className="py-2">
            <h5 className="font-bold text-md ">Unpaid Amount</h5>
            <p className="text-[var(--redLabel-color)]">CAD ${unpaidAmount}</p>
          </div>}
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
