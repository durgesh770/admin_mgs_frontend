import React from "react";
import { Divider } from "@mui/material";
import { FaGreaterThan } from "react-icons/fa6";

// interface for props
interface FrequentItemsProps {
  data: any;
}

const FrequentItems = ({ data }: FrequentItemsProps) => {
  return (
    <>
      <div className="cardsCss">
        <div className="pb-3">
          <span className="text-lg font-extrabold">Frequent Items</span>
        </div>

        <p className="lebleCss text-sm ">In the Last Year</p>

        <Divider />
        <div className="pt-4">
          <p className="text-sm font-extrabold">O.PROMO-BRAZILIAN+UNDERARMS</p>
        </div>

        <div className="py-3 flex justify-between items-start">
          <div>
            <p className="lebleCss text-sm ">{data.appointments.time}</p>
            <p className="lebleCss text-sm ">{data.appointments.des}</p>
          </div>
          <div>
            <FaGreaterThan />
          </div>
        </div>

        <Divider />

        <div className="pt-4">
          <p className="text-sm font-extrabold">O.PROMO-FULLEGS</p>
        </div>

        <div className="py-3 flex justify-between items-start">
          <div>
            <p className="lebleCss text-sm ">{data.appointments.time}</p>
            <p className="lebleCss text-sm ">{data.appointments.des}</p>
          </div>
          <div>
            <FaGreaterThan />
          </div>
        </div>

        <Divider />
      </div>
    </>
  );
};

export default FrequentItems;
