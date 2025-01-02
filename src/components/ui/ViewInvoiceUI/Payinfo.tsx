import moment from "moment";
import React from "react";

export const Payinfo = ({ invoicedata }: any) => {
  const advancedDate = moment(
    invoicedata?.paymentId?.advancePayment?.paymentDate
  ).format("DD MMM YYYY");

  const AdvanceDeposit = () => {
    return (
      <>
        {invoicedata?.paymentId?.paymentType == "advance" && (
          <>
            <li>
              <span className="  tracking-wider">Advance deposit of </span>
              <span className="text-green-500 tracking-wider">
                {" "}
                CAD${invoicedata?.paymentId?.advancePayment?.amount ||
                  " - "}{" "}
                PAID through{" "}
                {invoicedata?.paymentId?.advancePayment?.paymentMethod} with
                Reference No{" "}
                {invoicedata?.paymentId?.advancePayment?.paymentRefNo} on{" "}
                {advancedDate || ""}
              </span>
            </li>
          </>
        )}
      </>
    );
  };

  const PaymentsArrays = ({ item }: any) => {
    return (
      <>
        <li className="pt-1">
          <span className="tracking-wider">Payment deposit of </span>
          <span className="text-green-500 tracking-wider">
            CAD${item?.amount || " - "} PAID through
            {item?.paymentMethod} with Reference No
            {item?.paymentRefNo} on{" "}
            {moment(item.paymentDate).format("DD MMM YYYY") || ""}
          </span>
        </li>
      </>
    );
  };

  const AdvanceDepositRefunded = () => {
    return (
      <>
        {invoicedata?.paymentId?.paymentType == "advance" && (
          <li className="mt-1">
            <span className="  tracking-wider ">Pending payment of </span>
            <span className="text-red-600 tracking-wider">
              {" "}
              CAD${invoicedata?.paymentId?.advancePayment?.amount || " - "} is
              SUCCESSFULLY REFUNDED on {advancedDate || ""}
            </span>
          </li>
        )}
      </>
    );
  };

  const PaymentNotPaid = () => {
    return (
      <>
        <li className="mt-1">
          <span className=" tracking-wider ">Pending payment of </span>
          <span className="text-red-600 tracking-wider">
            {" "}
            CAD${invoicedata?.paymentId?.payment?.amount} NOT PAID
          </span>
        </li>
      </>
    );
  };
  return (
    <>
      <div className=" ml-5 my-4 font-semibold input-label pt-3 pb-3">
        {invoicedata?.paymentId?.paymentStatus == "paid" && (
          <>
            <AdvanceDeposit />
            {invoicedata.paymentId.payments.map((item: any, index: number) => {
              return <>{<PaymentsArrays key={index} item={item} />}</>;
            })}

            <li className="mt-1">
              <span className="  tracking-wider "> Pending payment of </span>
              <span className="text-green-500 tracking-wider">
                {" "}
                CAD${invoicedata?.paymentId?.payment?.amount} PAID through{" "}
                {invoicedata?.paymentId?.payment?.paymentMethod} with Reference
                No {invoicedata?.paymentId?.payment?.paymentRefNo} on{" "}
                {moment(invoicedata?.paymentId?.payment?.paymentDate).format(
                  "DD MMM YYYY"
                )}
              </span>
            </li>

            {invoicedata.paymentId.tips?.map((item: any, index: number) => {
              return (
                <li className="mt-1">
                  <span className="  tracking-wider ">Tip </span>
                  <span className="text-green-500 tracking-wider">
                    CAD${item.amount} PAID to {item.teamMemberName}
                  </span>
                </li>
              );
            })}
          </>
        )}

        {invoicedata?.paymentId?.paymentStatus == "pending" && (
          <>
            <AdvanceDeposit />
            {invoicedata.paymentId.payments.map((item: any, index: number) => {
              return <>{<PaymentsArrays key={index} item={item} />}</>;
            })}
            <PaymentNotPaid />

            {invoicedata.paymentId.tips?.map((item: any, index: number) => {
              return (
                <li className="mt-1">
                  <span className="  tracking-wider ">Tip </span>
                  <span className="text-green-500 tracking-wider">
                    CAD${item.amount} PAID to {item.teamMemberName}
                  </span>
                </li>
              );
            })}
          </>
        )}

        {invoicedata?.paymentId?.paymentStatus == "refunded" && (
          <>
            <AdvanceDeposit />
            <AdvanceDepositRefunded />
            {invoicedata.paymentId.payments.map((item: any, index: number) => {
              return <>{<PaymentsArrays key={index} item={item} />}</>;
            })}

            {invoicedata.paymentId.payment.paymentStatus == "paid" && (
              <div>
                <span>Payment of </span>
                <span
                  className="text-green-600 tracking-wider mt-2"
                  style={{ fontFamily: "BoldText" }}
                >
                  CAD${invoicedata?.paymentId?.payment?.amount?.toFixed(2)} PAID
                </span>
              </div>
            )}

            {invoicedata.paymentId.payment.paymentStatus == "pending" && (
              <div>
                <span>Pending payment of </span>
                <span
                  className="text-red-600 tracking-wider mt-2"
                  style={{ fontFamily: "BoldText" }}
                >
                  CAD${invoicedata?.paymentId?.payment?.amount?.toFixed(2)} not PAID
                </span>
              </div>
            )}

            {invoicedata.paymentId.tips?.map((item: any, index: number) => {
              return (
                <li className="mt-1">
                  <span className="  tracking-wider ">Tip </span>
                  <span className="text-green-500 tracking-wider">
                    CAD${item.amount} PAID to {item.teamMemberName}
                  </span>
                </li>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
