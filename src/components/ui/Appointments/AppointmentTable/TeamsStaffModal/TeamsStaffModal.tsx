"use client";
import React from "react";
import { DialogTitle, Grid, Divider } from "@mui/material";
import Modal from "@/components/ui/Modal";
import ButtonCom from "@/components/ui/Button";

interface SelectStaffprops {
  //default data
  data?: string;
  setData?: any;

  //list
  options: { value: string; label: string }[];

  //modal
  target?: React.ReactNode;
  open: boolean;
  setOpen: any;
  submit: any;
}

const TeamsStaffModal = ({
  // title,
  setOpen,
  open,
  options,
  setData,
  data,
  target,
  submit,
}: SelectStaffprops) => {
  return (
    <Modal customOpen={open} customClose={setOpen} target={target}>
      <DialogTitle>Manage Location for</DialogTitle>

      <Divider />
      <div className="py-6 ">
        <div className="block border border-gray-200 sm:flex ">
          <span
            style={{ width: "270px" }}
            className={`inline-flex items-center sm:pl-2 pl-2 text-md text-black font-bold sm:bg-[--brand-pastel-color] sm:border sm:border-gray-200 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600`}
          >
            Staff
          </span>
          <div className="relative w-full">
            <select
              id="countries"
              defaultValue={data}
              onChange={(e) => {
                setData && setData(e.target.value);
              }}
              className={`border-0 focus:outline-none focus:ring-0 text-gray-900 focus:border-gray-100 block flex-1 min-w-0 w-full text-sm border-gray-200 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[--brand-white-color] dark:focus:ring-0 dark:focus:border-gray-100`}
            >
              {options.map((item: any, index: number) => {
                return (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <Divider />

      <Grid className="px-2 py-4 StaffMemberCss">
        <Grid>
          <ButtonCom
            loading={false}
            btnType="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </ButtonCom>
        </Grid>
        <Grid>
          <ButtonCom loading={false} btnType="secondary" onClick={submit}>
            Save
          </ButtonCom>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default TeamsStaffModal;
