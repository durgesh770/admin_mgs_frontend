"use client";
import React from "react";
import { Grid } from "@mui/material";
import { Address } from "@/components/ui/ViewInvoiceUI/Address";
import { Table } from "@/components/ui/ViewInvoiceUI/Table";
import { Payinfo } from "@/components/ui/ViewInvoiceUI/Payinfo";
import { Billto } from "@/components/ui/ViewInvoiceUI/Billto";
import { useParams } from "next/navigation";
import { useGetSingleViewInvoice } from "@/hooks/Payment";
import { formatDateforHeader } from "@/utils/tools";

export const ViewInvoice = () => {
  const { id } = useParams();
  const { data } = useGetSingleViewInvoice(id) as any;

  return (
    <>
      <div className="min-h-screen pt-4  m-auto">
        <Grid
          sx={{
            width: "60vw",
            margin: "auto",
            paddingTop: "15px",
            "@media (max-width: 900px)": {
              width: "100%",
            },
          }}
        >   
        {}
         <span className=" sm:text-3xl text-xl">
          Invoice |{" "}
          {data?.appointmentId?.date != undefined &&
            formatDateforHeader(
              data.appointmentId?.date,
              data.appointmentId?.start_time_range,
              data.appointmentId?.end_time_range
            )}
        </span>
          <div className="bg-[--brand-grey-color] pt-10 min-h-screen pb-10">
            <div className="border bg-[--brand-pastel-color] border-gray-300 c">
              <Address data={data} />
              <Billto data={data} />
              <Table data={data} />
              <Payinfo invoicedata={data} />
            </div>
          </div>
        </Grid>
      </div>
    </>
  );
};
