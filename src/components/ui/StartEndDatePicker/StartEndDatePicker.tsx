//react
import React from "react";
import DatePicker from "react-multi-date-picker";
//mui
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const StartEndDatePicker = ({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}: any) => {
  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  return (
    <>
      <style>{`
        .rmdp-day.rmdp-today span {
          background-color: var(--brand-black-color); 
          color: white;
        }
        .rmdp-day.rmdp-selected span:not(.highlight) {
          background-color: var(--brand-color);
          box-shadow: 0 0 3px #8798ad;
          color: white;
        }
        .rmdp-day.rmdp-today.rmdp-selected span:not(.highlight) {
          background-color: var(--brand-color);
          box-shadow: 0 0 3px #8798ad;
          color: white;
        }
        .rmdp-day.rmdp-today.rmdp-selected span {
          background-color: var(--brand-black-color);
          color: white;
        }
        .rmdp-week-day {
          color: var(--brand-color); 
        }
        .rmdp-arrow {
          border: solid var(--brand-black-color);
          border-width: 0 2px 2px 0;
        }
        .rmdp-arrow-container:hover {
          background-color: var(--brand-pastel-color);
          color: var(--brand-black-color);
        }
        .rmdp-arrow-container:hover .rmdp-arrow {
          border: solid var(--brand-black-color);
          border-width: 0 2px 2px 0;
        }
        .rmdp-input {
          border: 1px solid var(--brand-color);;
          border-radius: 15px;
          height: 30px;
          width: 150px;
          margin: 1px 0;
        }
        .rmdp-input::placeholder {
          color: var(--brand-color);; 
        }
        .rmdp-container {
          background-color: transparent; 
          display: flex;
          align-items: center; /* Align items vertically centered */
        }
      `}</style>
      <div className="md:flex block flex-row gap-3 mt-4 items-center ">
        <div>
          <DatePicker
            value={startDate}
            onChange={handleStartDateChange}
            format="DD/MM/YYYY"
            placeholder="Start Date"
            className="items-center text-[--brand-color] w-full"
          />
        </div>
        <div className="hidden md:block">
          <ArrowForwardIcon sx={{ color: "#43484E" }} />
        </div>
        <div className="md:hidden flex justify-center">
          <ArrowDownwardIcon sx={{ color: "#43484E" }} />
        </div>

        <div>
          <DatePicker
            value={endDate}
            onChange={handleEndDateChange}
            format="DD/MM/YYYY"
            placeholder="End Date"
            className="items-center"
          />
        </div>
      </div>
    </>
  );
};

export default StartEndDatePicker;
