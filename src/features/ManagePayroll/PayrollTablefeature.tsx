"use client";
//react
import React, { useState, useEffect } from "react";
import { TableRow } from "@/interface/Reports";
import moment from "moment";
import { WorkedHoursDrawer } from "./PayrollWorkedHours/WorkedHoursDrawer";
import DropDrownPayroll from "../../components/ui/ManagePayrollUI/DropDrownPayroll";
//hook
import {
  useDeleteTimeTracker,
  useUpdateTimeTrackerStatus,
} from "@/hooks/TimeTracker";
import PaginationFeature from "@/features/Appointments/PaginationFeature/PaginationFeature";
import { formatMinutesToHoursAndMinutes } from "@/utils/tools";
import { DefaultSelected, TotalTip } from "@/utils/functions";
import { TipDrawer } from "./ManageTip/TipDrawer";
import { useAuth } from "@/context/AuthContext";
//mui
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LongMenu from "@/components/ui/LongMenu/LongMenu";
import WarningModal from "@/components/ui/Modal/Warning";
import DynamicTable from "@/components/ui/Table";

const PayrollTablefeature = ({
  setDrawerOpen,
  setFields,
  setDateFilter,
  setSelectedValue,
  setCurrentbtn,
  currentbtn,
  setPage,
  data,
  refetch,
  refetchCounter,
}: any) => {
  // integration
  const { handleUpdateStatus } = useUpdateTimeTrackerStatus();
  const { handleDelete, loading } = useDeleteTimeTracker();
  const { permissions } = useAuth();
  let manage_payroll = permissions.includes("manage_payroll");

  // state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any>({});
  const [isTipDrawerOpen, setIsTipDrawerOpen] = useState(false);
  const [hours, setHours] = useState<any>({});
  const [tip, setTip] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [trackerId, setTrackerId] = useState("");

  //  function
  const handleDataChange = (value: any, rowIndex: number, id: string) => {
    setSelectedStatus({ ...selectedStatus, [rowIndex]: value });
    if (value == "1") {
      handleUpdateStatus(id, { status: "pending" });
    } else {
      handleUpdateStatus(id, { status: "completed" });
    }
  };

  // handle side effects
  useEffect(() => {
    setSelectedStatus(DefaultSelected(data.results));
  }, [data]);

  useEffect(() => {
    if (trackerId.trim()) {
      const filteredData = data.results.filter(
        (item: any) => item.id == trackerId
      );
      setHours(filteredData[0]);
    }
  }, [data, refetchCounter]);

  // table
  const Columns = [
    "Date",
    "Team member",
    "Hours Worked",
    "Tip Collected",
    "Total Billable Amount",
    manage_payroll && "Status",
    "Action",
  ];

  // handle three dot btn
  const handleOptions = (option: any, item: any) => {
    if (option == 1) {
      setFields(item.hours);
      setDateFilter(item.date);
      setSelectedValue(item?.teamMemberId?.id);
      //@ts-ignore
      setCurrentbtn({
        currentOptions: option,
        id: item,
      });
      setDrawerOpen(true);
    } else if (option == 2) {
      setModalOpen(true);
      setCurrentbtn({
        currentOptions: option,
        id: item,
      });
    }
  };

  const option = [
    { id: 1, title: "Edit Payroll", icon: <EditIcon />, line: true },
    { id: 2, title: "Delete", icon: <DeleteIcon />, line: false },
  ];

  // formate table data
  const TableFormat: TableRow[] = data.results.map(
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
        ...(manage_payroll && {
          name: {
            type: "custom",
            bold: false,
            value: item.teamMemberName || item?.teamMemberId?.name,
          },
        }),
        HoursWorked: {
          type: "custom",
          bold: false,
          value: (
            <>
              {`${formatMinutesToHoursAndMinutes(duration)}`}
              <span
                className="mt-5 text-blue-500 no-underline cursor-pointer "
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
          value: <span>${(hoursSum + TotalTip(item.tips)).toFixed(2)} </span>,
        },
        ...(manage_payroll && {
          Status: {
            type: "custom",
            bold: false,
            value: (
              <DropDrownPayroll
                data={{
                  placeHolder: "",
                  data: [
                    { title: "Pending", id: "1" },
                    { title: "Completed", id: "2" },
                  ],
                }}
                setData={(value) => handleDataChange(value, index, item.id)}
                value={selectedStatus[index] || ""}
              />
            ),
          },
        }),
        Action: {
          value: (
            <>
              {item.status != "completed" ? (
                <LongMenu
                  options={option}
                  handleOptions={(selectedOption: any) =>
                    handleOptions(selectedOption.id, item)
                  }
                />
              ) : (
                ""
              )}
            </>
          ),
        },
      };
    }
  );

  return (
    <>
      <div>
        <DynamicTable columns={Columns} data={TableFormat} />
      </div>

      <WorkedHoursDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        hours={hours}
        setHours={setHours}
        trackerId={trackerId}
        refetch={refetch}
      />
      <PaginationFeature setPage={setPage} totalPage={data.totalPages} />

      <TipDrawer
        isTipDrawerOpen={isTipDrawerOpen}
        setIsTipDrawerOpen={setIsTipDrawerOpen}
        tip={tip}
      />
      <WarningModal
        open={modalOpen}
        updateOpen={() => setModalOpen(false)}
        title={
          "Are u really sure if u delete this all the worked hours log on this day will be deleted ?"
        }
        handleLeftbtn={() =>
          handleDelete(currentbtn.id.id, refetch, setModalOpen)
        }
        handleRightbtn={() => setModalOpen(false)}
        btnfirst={"Delete"}
        btnSec={"No"}
        loading={!loading}
      />
    </>
  );
};

export default PayrollTablefeature;
