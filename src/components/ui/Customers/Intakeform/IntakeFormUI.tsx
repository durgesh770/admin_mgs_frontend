import { Divider } from "@mui/material";
import React from "react";

const IntakeFormUI = ({ Step2data, Step1data }: any) => {
  return (
    <>
      <div>
        <p className=" font-bold text-lg">Step 1. Personal Information</p>
      </div>
      <div className="pt-6 pb-6">
        {Step1data?.map((item: any, index: number) => {
          return (
            <>
              <div className="py-2">
                <p className=" text-base font-bold">
                  {index + 1}. {item.title}
                </p>
                <span className=" font-medium text-base">{item.name}</span>
              </div>
              <Divider />
            </>
          );
        })}
      </div>

      <div>
        <p className=" font-bold text-lg">Step 2. Patient History</p>
      </div>

      <div className="pt-6 pb-6">
        {Step2data?.map((item: any, index: number) => {
          return (
            <>
              <div className="py-2">
                <p className="text-base font-bold py-2">
                  {index + 1}. {item.title}
                </p>
                <span className=" font-medium text-base"> {item.desc}</span>
              </div>
              <Divider />
            </>
          );
        })}
      </div>

      <div>
        <p className=" font-bold text-lg">Step 3. Acknowledgment</p>
      </div>
      <div className="pt-6 pb-6">ALL T&C ACCEPTED</div>
    </>
  );
};

export default IntakeFormUI;
