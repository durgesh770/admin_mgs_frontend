import DynamicTable from "@/components/ui/Table";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TableRow } from "@/interface/Reports";
import { formatMinutesToHoursAndMinutes, formatTime } from "@/utils/tools";
import LongMenu from "@/components/ui/LongMenu/LongMenu";

const WorkedHoursTable = ({
  hours,
  setCurrentbtn,
  setFields,
  setShowAddTime,
  setHidden,
  setIsDrawerOpen,
  setModalOpen,
  isAction,
}: any) => {
  // handle three dot btn
  const handleOptions = (option: any, item: any) => {
    setCurrentbtn({ currentOptions: option, id: item });
    setFields([item]);
    if (option == 1) {
      setHidden(false);
      setShowAddTime(true);
      setIsDrawerOpen(true);
    } else if (option == 2) {
      setModalOpen(true);
    }
  };

  const option = [
    { id: 1, title: "Edit Payroll", icon: <EditIcon />, line: true },
    { id: 2, title: "Delete", icon: <DeleteIcon />, line: false },
  ];

  const drawerTableFormat: TableRow[] = hours.hours.map((item: any) => ({
    Time: {
      type: "custom",
      bold: false,
      value: (
        <span>
          {formatTime(item.startTime)} to {formatTime(item.endTime)}
        </span>
      ),
    },
    HoursWorked: {
      type: "custom",
      bold: false,
      value: `${formatMinutesToHoursAndMinutes(item.duration)}`,
    },
    amount: {
      type: "custom",
      bold: false,
      value: <span>${item.amount?.toFixed(2)}</span>,
    },
    WorkType: {
      type: "custom",
      bold: false,
      value: item.workedType,
    },
    ...(!isAction && {
      Action: {
        value: (
          <>
            {hours.status != "completed" ? (
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
    }),
  }));

  let drawerColumns = [
    "Time",
    "Hours Worked",
    "Total Billable Amount",
    "Work Type",
  ];
  
  if (!isAction) {
    drawerColumns = [...drawerColumns, "Action"];
  }
  

  return <DynamicTable columns={drawerColumns} data={drawerTableFormat} />;
};

export default WorkedHoursTable;
