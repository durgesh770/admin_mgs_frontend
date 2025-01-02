import React from "react";
import DatePicker from "react-multi-date-picker";

const MultiDatePicker = ({ multiDate, setMultiDate }: any) => {
  return (
    <>
      <style>{`
        // :root {
        //   --brand-color: #F59B90;
        // }

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
      `}</style>
      <DatePicker
        value={multiDate}
        onChange={setMultiDate}
        multiple
        className="rmdp-container w-full"
      />
    </>
  );
};

export default MultiDatePicker;
