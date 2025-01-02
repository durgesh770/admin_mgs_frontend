import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import React from "react";
import { Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useConfirmedAppointment } from "@/hooks/Appointment";

const ConfirmYourAppointment = ({ open, setOpen, appointmentId }: any) => {
  const { handleConfirmed, loading } = useConfirmedAppointment();

  return (
    <div>
      <Modal
        customOpen={open}
        customClose={setOpen}
        target={
          <p className="underline cursor-pointer">Confirm Your Appointment</p>
        }
      >
        <div className="flex pb-1 items-center ">
          <div className="float-left">
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex-grow text-center">
            <span className="font-bold text-sm sm:text-xl text-[--brand-color]">
              Confirm Your Appointment
            </span>
          </div>
        </div>
        <Divider />

        <div className="max-h-[15rem] overflow-y-auto ">
          <div className="pt-9 text-center font-semibold pb-9 px-4 ">
            Are you Sure! You want to Confirm Your Appointment
          </div>
          <Divider />

          <div className=" flex flex-row justify-between gap-3 items-center p-2">
            <div>
              <Button
                onClick={() => handleConfirmed(appointmentId)}
                btnType="secondary"
                loading={!loading}
              >
                Yes
              </Button>
            </div>

            <div>
              <Button
                btnType="secondary"
                onClick={() => setOpen(false)}
                loading={false}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmYourAppointment;
