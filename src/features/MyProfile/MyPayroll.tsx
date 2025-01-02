// react
import React, { useState } from "react";
// component 
import DynamicTable from "@/components/ui/Table";
import PaginationFeature from "../Appointments/PaginationFeature/PaginationFeature";
import { TipDrawer } from "../ManagePayroll/ManageTip/TipDrawer";
import { WorkedHoursDrawer } from "../ManagePayroll/PayrollWorkedHours/WorkedHoursDrawer";
// moment
import moment from "moment";
// utils
import { formatMinutesToHoursAndMinutes } from "@/utils/tools";
import { TotalTip } from "@/utils/functions";
// interface
import { TableRow } from "@/interface/Reports";
// hooks
import { useGetTimeTracker } from "@/hooks/TimeTracker";
// context
import { useAuth } from "@/context/AuthContext";

const MyPayroll = () => {
  
  const { user } = useAuth();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    teamMemberId: user?.id,
  });
  const { timeData, setPage } = useGetTimeTracker(setParams, params);
  const [isTipDrawerOpen, setIsTipDrawerOpen] = useState(false);
  const [tip, setTip] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hours, setHours] = useState<any>({});
  const [trackerId, setTrackerId] = useState("");

  // formate table data
  const TableFormat: TableRow[] = timeData.results.map(
    (item: any, index: number) => {
      let hoursSum = item.hours.reduce(
        (accumulator: any, currentValue: any) => {
          return accumulator + currentValue.amount;
        },
        0
      );

      let duration = item.hours.reduce(
        (accumulator: any, currentValue: any) => {
          return accumulator + currentValue.duration;
        },
        0
      );

      return {
        Date: {
          type: "custom",
          bold: false,
          value: moment(item.date).format("DD MMM YYYY"),
        },
        name: {
          type: "custom",
          bold: false,
          value: item.teamMemberId.name,
        },

        HoursWorked: {
          type: "custom",
          bold: false,
          value: (
            <>
              {`${formatMinutesToHoursAndMinutes(duration)}`}
              <span
                className=" mt-5 text-blue-500 no-underline cursor-pointer"
                onClick={() => {
                  setTrackerId(item.id);
                  setIsDrawerOpen(true), setHours(item);
                }}
              >
                (view)
              </span>
            </>
          ),
        },
        TipCollected: {
          type: "custom",
          bold: false,
          value: (
            <>
              ${TotalTip(item.tips).toFixed(2)}
              <span
                onClick={() => {
                  setIsTipDrawerOpen(true), setTip(item.tips);
                }}
                className="mt-5 text-blue-500 no-underline cursor-pointer"
              >
                (view)
              </span>
            </>
          ),
        },
        TotalBillableAmount: {
          type: "custom",
          bold: false,
          value: <span>${hoursSum + TotalTip(item.tips)} </span>,
        },
        Status: {
          type: "custom",
          bold: false,
          value:
            item.status == "completed" ? (
              <span className=" text-green-600">Completed </span>
            ) : (
              <span className=" text-red-600">Pending</span>
            ),
        },
      };
    }
  );

  return (
    <>
      <div className="min-h-screen">
        <DynamicTable data={TableFormat} columns={Columns} />
        <PaginationFeature setPage={setPage} totalPage={timeData.totalPages} />
      </div>

      <TipDrawer
        isTipDrawerOpen={isTipDrawerOpen}
        setIsTipDrawerOpen={setIsTipDrawerOpen}
        tip={tip}
      />
      
      <WorkedHoursDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        hours={hours}
        setHours={setHours}
        trackerId={trackerId} 
        isAction={true}
      />
    </>
  );
};

const Columns = [
  "Date",
  "Team member",
  "Hours Worked",
  "Tip Collected",
  "Total Billable Amount",
  "Status",
];

export default MyPayroll;
