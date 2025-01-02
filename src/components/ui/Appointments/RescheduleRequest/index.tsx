import * as React from "react";
// mui
import { Button, Divider, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

interface RescheduleRequestProps {
  comment?: string;
  setOpen:any
}

const RescheduleRequestUI =({ comment, setOpen }: RescheduleRequestProps)=> {
  return (
    <>
      <div className="bg-[--brand-pastel-color] p-3 border border-gray-300 rounded-2xl shadow-md">
        <div className="flex flex-row items-center justify-between">
          <Button onClick={()=>setOpen(false)}>
            <ClearOutlinedIcon />
          </Button>

          <Grid className="text-[--brand-color]">
            <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
              RESCHEDULE REQUEST
            </Typography>
          </Grid>

          <div></div> 
        </div>
        <Divider />
        <p className="mb-1 font-bold mt-4">Comment</p>
        <p className="mb-4">{comment}</p>
        <p className="mb-2">Regard,</p>
        <p className="mb-2">Suzy Tasse,</p>
      </div>
    </>
  );
}

export default RescheduleRequestUI