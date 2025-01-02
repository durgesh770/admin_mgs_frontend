import React from "react";
import DatePicker from "react-multi-date-picker";

const RangeDatePicker = ({ setValue, value }: any) => {
  return (
    <>
      <style>{`
        .rmdp-day.rmdp-today span {
          background-color: var(--brand-black-color); 
          color: white; 
        }

        .rmdp-day.rmdp-today.rmdp-range.start span {
          background-color: var(--brand-color); 
          color: white; 
        }

        .rmdp-range {
          background-color: var(--brand-pastel-color);
          color: var(--brand-black-color);
        }

        .rmdp-day.rmdp-range.end {
          background-color: var(--brand-color);
          color: white;
          border-radius: 100%; 
        }

        .rmdp-day.rmdp-range.start {
          background-color: var(--brand-color);
          border-radius: 100%; 
        }

        .rmdp-day.rmdp-today.rmdp-range.start,
        .rmdp-day.rmdp-today.rmdp-range.end {
          background-color: var(--brand-color);
          border-radius: 100%; 
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
      `}</style>
      <DatePicker
        value={value}
        onChange={setValue}
        range
        className="rmdp-container w-full "
      />
    </>
  );
};

export default RangeDatePicker;
