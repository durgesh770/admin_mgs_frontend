//react
import React from "react";

//utils
import { formatAppointmentCount } from "@/utils/functions";

interface AppointmentCardProps {
  icon: any;
  appointmentCount: any;
  cardTitle: any;
  bgCustom?: any;
  widthCustom?: any;
  dollarIcon?: any;
}

export const AppointmentCard = ({
  icon,
  appointmentCount,
  cardTitle,
  bgCustom,
  widthCustom,
  dollarIcon,
}: AppointmentCardProps) => {
  const formattedCount = formatAppointmentCount(appointmentCount);

  return (
    <>
      <div
        className={`p-[20px] border border-gray-300 h-[170px] ${
          widthCustom ? "md:w-[260px] w-full" : "md:w-[200px] w-[270px]"
        }   shadow-md rounded-2xl m-auto md:m-0 ${
          bgCustom ? "bg-[--brand-pastel-color]" : "bg-[--brand-white-color]"
        }`}
      >
        <div className=" ml-1 flex ">
          <span className="p-[5px] bg-[--brand-color] rounded-full text-[--brand-pastel-color] items-center mt- ml-1">
            {icon}
          </span>
        </div>

        {formattedCount < 0 ? (
          <div className="mt-2 ml-2 ost font-semibold text-[1.5rem]">
            <span>-${Math.abs(formattedCount)}</span>
          </div>
        ) : (
          <div className="mt-2 ml-2 ost font-semibold text-[1.5rem]">
            {dollarIcon && <span>$</span>}
            <span>{formattedCount}</span>
          </div>
        )}

        <div className="ost ml-2 text-[15px] font-medium text-[--brand-black-color] mt-2">
          {cardTitle}
        </div>
      </div>
    </>
  );
};
