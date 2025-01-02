import React from "react";
import Image from "next/image";
import logo from "../../../assets/images/Logo1.png";
import { Grid, Typography } from "@mui/material";

export const Address = ({data}:any) => {
  return (
    <>
      <div className=" px-4 py-4 m-1">
        <div className="flex flex-row  gap-6 justify-between items-center">
          <div>
            <h2 className="text-[--brand-color] sm:text-2xl text-xl font-bold">MY GIRL SOUZ</h2>
            <div className="mt-4 input-label">
              <h4>4949 HUBALTA ROAD SE, CALGARY, AB T2B 1T5, CANADA</h4>
            </div>
            <div className="input-label mt-2">
              <h4>403-994-0400</h4>
            </div>
            <div className=" input-label mt-2">
              <h4>INFO@MYGIRLSOUZ.COM</h4>
            </div>
          </div>
          <div className="pr-7 font-light hidden sm:block">
            <Image
              src={logo}
              width={180}
              height={100}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
      <div className="border border-gray-200"></div>
    </>
  );
};
