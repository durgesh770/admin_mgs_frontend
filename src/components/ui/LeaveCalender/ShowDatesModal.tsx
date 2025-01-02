import React from "react";
import Modal from "../Modal";
import { Button, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";

//component
interface ShowDatesModalprops {
  open: boolean;
  setOpen: any;
  leaveDates?: {
    dates: string[];
    status: boolean;
  };
}

const ShowDatesModal = ({ open, setOpen, leaveDates }: ShowDatesModalprops) => {
  return (
    <>
      <Modal customOpen={open} customClose={setOpen}>
        <div className="flex pb-1 items-center ">
          <div className="float-left">
            <Button onClick={() => setOpen(false)}>
              <CloseIcon />
            </Button>
          </div>
          <div className="flex-grow text-center">
            <span className="font-bold text-sm sm:text-xl text-[--brand-color]">
              {leaveDates?.status
                ? "Days Selected for Leaves"
                : "Admin Comment"}
            </span>
          </div>
        </div>
        <Divider />
        <div className="max-h-[15rem] overflow-y-auto ">
          <div className="pt-5 text-center font-semibold pb-9 ">
            {leaveDates?.dates?.map((item, index) => {
              return (
                <p key={index}>
                  {moment(item).format("DD MMM YYYY") != "Invalid date"
                    ? moment(item).format("DD MMM YYYY")
                    : item}
                </p>
              );
            })}
          </div>
        </div>
        <Divider />
      </Modal>
    </>
  );
};
export default ShowDatesModal;
