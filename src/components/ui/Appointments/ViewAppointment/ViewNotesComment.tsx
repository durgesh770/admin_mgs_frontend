import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Modal from "@/components/ui/Modal";

const ViewNotesComments = ({ comment, setOpen, open }: any) => {
  return (
    <>
      <Modal customOpen={open} customClose={() => setOpen(false)}>
        <div className="bg-[--brand-pastel-color] p-3 border border-gray-300 rounded-2xl  ">
          <div className="flex flex-row items-center justify-between">
            <div className="">
              <button onClick={() => setOpen(false)}>
                {" "}
                <ClearOutlinedIcon />
              </button>
            </div>
            <Grid className="text-[--brand-color] ">
              <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
                {comment.text}
              </Typography>
            </Grid>
            <div></div>
          </div>
          <Divider />
          <div className="py-4 ">
            <span>{comment.item || "-"}</span>
          </div>
          <div className="mb-10"></div>
          <Divider />
        </div>
      </Modal>
    </>
  );
};

export default ViewNotesComments;
