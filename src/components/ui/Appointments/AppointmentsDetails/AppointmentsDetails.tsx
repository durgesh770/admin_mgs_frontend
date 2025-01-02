import React, { useEffect } from "react";
import AppointmentDate from "./AppointmentDate/AppointmentDate";
import AppointmentTime from "./AppointmentTime/AppointmentTime";
import { getQueryFromUrl } from "@/utils/tools";
import moment from "moment";

interface AppointmentDetails {
  data: {
    note: string;
    date: string;
    time: string;
  };
  setData: any;
}

interface query {
  customer: string;
  date: string;
}

const AppointmentsDetails = ({ data, setData }: AppointmentDetails) => {
  const query = getQueryFromUrl() as query;

  useEffect(() => {
    if (query.date) {
      setData((pre: any) => ({
        ...pre,
        date: moment(query.date).format("YYYY-MM-DD"),
      }));
    }
  }, [query.date]);

  return (
    <>
      <div className="pt-6 pb-3 bg-[--brand-white-color]">
        <span className="md:text-xl text-lg text-[--brand-color]">
          Appointments Details
        </span>
      </div>

      <div className="block border border-gray-200 lg:flex bg-[--brand-white-color]">
        <span
          style={{ width: "180px" }}
          className={` inline-flex items-center sm:pl-2 pl-2 text-md text-black font-bold lg:bg-[--brand-pastel-color] lg:border lg:border-gray-200 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600`}
        >
          {" "}
          Date & Time
        </span>

        <div className="flex items-center justify-center gap-6">
          <div className="ml-4 text-blue-500">
            <AppointmentDate
              date={data.date}
              setValue={(e: any) =>
                setData((old: any) => ({ ...old, date: e }))
              }
            />
          </div>
          <div>
            {" "}
            <span>to</span>
          </div>
          <div className="ml-4 text-blue-500">
            <AppointmentTime
              defaultTime={data.time}
              setTime={(e: any) => setData((old: any) => ({ ...old, time: e }))}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentsDetails;
