"use client";
import React from "react";
// mui
import { CheckCircle } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
// component
import DynamicTable from "@/components/ui/Table";
import LongMenu from "@/components/ui/LongMenu/LongMenu";
// utils
import { LeaveCalenderChips } from "@/utils/tools";


const LeaveCalenderTable = ({
  handleOptions,
  option,
  setLeaveDates,
  setOpen,
  data
}: any) => {


  // Format table data
  const tableFormat: any = data?.map((item:any, index:number) => {
    // Define options for each row
    let rowOptions = [...option];
    // If the item is approved, add the "Approve / Reject" option at the beginning
    if (item.status == "pending") {
      rowOptions.unshift(
        {
          id: 3,
          title: "Approve / Reject",
          icon: <CheckCircle />,
          line: false,
        },
        { id: 1, title: "Edit Leave", icon: <EditIcon />, line: true }
      );
    }

    return {
      SrNo: (index + 1).toString(),
      name: item?.teamMemberId?.name,
      days: {
        type: "link",
        bold: false,
        value: (
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              setOpen(true),
                setLeaveDates({
                  dates: item.dates,
                  status: true,
                });
            }}
          >
            {item.dates.length.toString()}
          </span>
        ),
      },
      leave: item.leaveType,
      comment: item.comment,
      Status: {
        type: "custom",
        bold: false,
        value: LeaveCalenderChips(item, setLeaveDates, setOpen),
      },
      Action: {
        type: "custom",
        bold: false,
        value: (
          <LongMenu
            options={rowOptions}
            handleOptions={(option: any) => handleOptions(option, item)}
          />
        ),
      },
    };
  });

  return (
    <>
      <div className="mt-4">
        <DynamicTable columns={columns} data={tableFormat} />
      </div>
    </>
  );
};

const columns = [
  "Sr. No",
  "Employee Name",
  " No. of days",
  "Leave Type",
  " Comment",
  "Status",
  "Action",
];

export default LeaveCalenderTable;
