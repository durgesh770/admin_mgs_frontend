"use client";
import LongMenu from "@/components/ui/LongMenu/LongMenu";
import Modal from "@/components/ui/Modal";
import { Button, Divider, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { LeaveCalenderChips } from "@/utils/tools";
import { useEffect } from "react";
// mui
import { CheckCircle } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

export default function LeaveCalenderTableMobile({
  defaultModal,
  setDefaultModal,
  handleOptions,
  option,
  setLeaveDates,
  setOpen,
  item,
}: any) {
  let rowOptions = [...option];

  useEffect(() => {
    if (item.status == "pending") {
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
    }
  }, [item]);

  return (
    <Modal customOpen={defaultModal} customClose={() => setDefaultModal(false)}>
      <div className="bg-[--brand-pastel-color] p-3 border border-gray-300 rounded-2xl  shadow-md">
        <div className="flex flex-row justify-between ">
          <div className="pb-2">
            <Button onClick={() => setDefaultModal(false)}>
              <ClearOutlinedIcon />
            </Button>
          </div>

          <Grid className="text-[--brand-color] ">
            <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
              Leave Details
            </Typography>
          </Grid>
          <div>
            <LongMenu
              options={rowOptions}
              handleOptions={(option: any) => handleOptions(option, item)}
            />
          </div>
        </div>

        <Divider />
        <div className="pb-3 m-1 mt-2 mb-1  ">
          <p className="mb-1 font-bold">EMPLOYEE NAME</p>
          <span>{item.teamMemberId.name}</span>
        </div>

        <Divider />
        <div className="pb-3 m-1 mt-2 mb-1  ">
          <p className="mb-1 font-bold">NO. OF DAYS</p>
          <span
            className=" cursor-pointer text-blue-600"
            onClick={() => {
              setOpen(true),
                setLeaveDates({
                  dates: item.dates,
                  status: true,
                });
            }}
          >
            {item.dates.length}
          </span>
        </div>

        <Divider />
        <div className="pb-3 m-1 mt-2 mb-1  ">
          <p className="mb-1 font-bold">LEAVE TYPE</p>
          <span>{item.leaveType}</span>
        </div>

        <Divider />
        <div className="pb-3 m-1 mt-2 mb-1  ">
          <p className="mb-1 font-bold">COMMENT</p>
          <span>{item.comment}</span>
        </div>

        <Divider />
        <div className="pb-3 m-1 mt-2 mb-1  ">
          <p className="mb-1 font-bold"> STATUS</p>
          <span>{LeaveCalenderChips(item, setLeaveDates, setOpen)}</span>
        </div>
      </div>
    </Modal>
  );
}
