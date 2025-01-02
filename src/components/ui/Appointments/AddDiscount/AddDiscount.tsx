// react 
import React from "react";
// mui
import { Grid } from "@mui/material";
// components
import ConfirmTotal from "../confirmAppointment/ConfirmTotal";
import AddDiscountPopup from "@/features/Appointments/ComponentFeatures/AddDiscountPopup/AddDiscountPopup";

interface AddDiscountprops {
  data: {
    tax: number;
    total: number;
    subtotal: number;
    discount: number;
  };

  defaultData?: {
    code?: string;
    custom?: {
      customType: string;
      customValue: number;
    };
  };
  setData?: any;
}

const AddDiscount = ({ data, defaultData, setData }: AddDiscountprops) => {
  return (
    <>
      <div className="block border border-gray-200 sm:flex">
        <Grid
          sx={{ width: "100%" }}
          className={`inline-flex items-center border-0 sm:pl-2 pl-2 text-md text-black font-bold sm:bg-[--brand-white-color]  dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600`}
        ></Grid>

        <div className="w-full bg-[--brand-white-color]">
          {!defaultData?.code && (
            <div className="p-2">
              <AddDiscountPopup
                amount={data.subtotal}
                defaultData={defaultData}
                setData={setData}
              />
            </div>
          )}

          <div className='py-2 border border-gray-200 "'>
            <ConfirmTotal data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDiscount;
