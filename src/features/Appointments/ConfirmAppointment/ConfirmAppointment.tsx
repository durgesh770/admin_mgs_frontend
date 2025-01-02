"use client";
// react
import React from "react";
// component
import ConfirmPaymentUI from "@/components/ui/Appointments/confirmAppointment/ConfirmPaymentUI";
import ConfirmTotal from "@/components/ui/Appointments/confirmAppointment/ConfirmTotal";
import ClientUI from "@/components/ui/Appointments/confirmAppointment/ConfirmUI";
import DynamicTable from "@/components/ui/Table";
import { formatTime } from "@/utils/tools";
import { TableRow } from "@/interface/Reports";

// PreviewData interface definition
interface PreviewData {
  data: {
    client: {
      id: string;
      name: string;
      email: string;
      phone: string;
    };
    bookings: {
      id: string;
      service: string;
      price: string;
      duration: number;
      time: {
        start_time?: number;
        end_time?: number;
      };
    }[];
    amount: {
      tax: number;
      total: number;
      subtotal: number;
      discount: number;
    };
  };

  setPaymentData?: any;
  takePayment?: boolean;
}

const ConfirmAppointment = ({
  data: { client, bookings, amount },
  setPaymentData,
  takePayment,
}: PreviewData) => {
  // Map bookings data into a formatted structure
  const bookingsFormat = bookings.sort((a:any,b:any)=> a.time.start_time - b.time.start_time).map((ser) => {
    return {
      id: ser.id,
      service: ser.service,
      // @ts-ignore
      Team: ser.teamMember?.name,
      price: ser.price,
      minutes: `${ser.duration}min`,
      time: `${formatTime(ser.time?.start_time)} :${formatTime(
        ser.time?.end_time
      )}`,
    };
  })

  // Adjusted tableFormat
  let tableFormat: TableRow[] = bookingsFormat.map((item) => ({
    service: {
      type: "custom",
      bold: false,
      value: <div style={{ whiteSpace: "pre-line" }}>{item.service}</div>,
    },
    team: item.Team || "",
    price: item.price || "",
    minute: item.minutes || "",
    time: item.time || "",
  }));


  return (
    <>
      <ClientUI data={client} />

      <div className="mb-2">
        <span className="mb-2 text-lg font-bold">Appointments Details</span>
      </div>

      <DynamicTable columns={columns} data={tableFormat} />

      <div className="w-full p-6 mt-6 mb-6 bg-white border border-gray-200">
        <ConfirmTotal data={amount} />
      </div>

      {takePayment && (
        <ConfirmPaymentUI
          customerId={client.id}
          setData={setPaymentData}
          amount={amount?.total}
        />
      )}
    </>
  );
};

// Columns for DynamicTable
const columns = ["services", "Team", "Price", "Minutes", "Time"];

export default ConfirmAppointment;
