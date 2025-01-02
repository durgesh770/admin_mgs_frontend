import React from "react";
import { TableRow } from "@/interface/Reports";
import { TotalTip } from "@/utils/functions";
import DynamicTable from "@/components/ui/Table";
import SideDrawer from "@/components/ui/SideDrawer";

export const TipDrawer = ({
  setIsTipDrawerOpen,
  isTipDrawerOpen,
  tip,
}: any) => {
  const drawerTableFormat: TableRow[] = tip.map((item: any) => ({
    Appointment: {
      type: "custom",
      bold: false,
      value: (
        <a
          href={`/appointments/view/${item.appointmentId}`}
          className="text-blue-600 cursor-pointer"
        >
          {item.appointmentId}
        </a>
      ),
    },
    CustomerName: {
      type: "custom",
      bold: false,
      value: item.customerName,
    },
    TipAmount: {
      type: "custom",
      bold: false,
      value: `$${item.amount}`,
    },
  }));

  return (
    <>
      <SideDrawer
        open={isTipDrawerOpen}
        onClose={() => setIsTipDrawerOpen(false)}
        title="Tip Details"
        headerHidden={true}
        customWidth={true}
      >
        <div className="px-4 py-4 ">
          <div className="flex justify-between items-center mb-4">
            <h2 className=" font-bold ml-2">Total Tip : ${TotalTip(tip).toFixed(2)}</h2>
          </div>
          <DynamicTable columns={drawerColumns} data={drawerTableFormat} />
        </div>
      </SideDrawer>
    </>
  );
};

const drawerColumns = ["Appointment", "Customer Name", "Tip Amount"];
