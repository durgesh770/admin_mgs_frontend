import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

interface HomeProps {
  number: number;
  serviceTitle: string;
  time: string;
  appointmentId:string
}

export const Home = ({ number, serviceTitle, time, appointmentId }: HomeProps) => {
  return (
    <>
      <Link  href={`/appointments/view/${appointmentId}`}
        className={`h-fit w-full bg-[--brand-pastel-color] rounded-2xl shadow-md border border-gray-100 p-4 mt-5 cursor-pointer`}
      >
        <div className="flex flex-row gap-7 items-center justify-between">
        <div className="flex flex-row gap-7 items-center ">

          <div className="rounded-full bg-[--brand-color] text-[--brand-white-color] h-10 w-10 flex items-center justify-center border border-[--brand-white-color]">
            {number}
          </div>
          <h1 className="ost font-extrabold text-[18px] text-[--brand-black-color]">
            {serviceTitle}
            <h1 className="ost font-bold text-[15px] text-[--brand-black-color] ">
            {time}
          </h1>
          </h1>
         </div>
          <div>
            <span>
              <ArrowForwardIosIcon className=" text-gray-500" />
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};
