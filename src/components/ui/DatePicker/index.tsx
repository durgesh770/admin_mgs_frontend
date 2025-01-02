"use client";
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface DatePickerComponent {
  setDateFilter: any;
  values: any;
  label:string
}

export default function DatePickerComponent({
  setDateFilter,
  values,
  label
}: DatePickerComponent) {

  const [value, setValue] = React.useState(values);
  let dat = dayjs(values || null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-full">
        <h4>{label}</h4>
        <DatePicker
          value={dat || value}
          onChange={(newValue) => {
            setValue(newValue), setDateFilter(newValue);
          }}
          slotProps={{ textField: { size: "small" } }}
          className="w-full text-[var(----mulish)]"
        />
      </div>
    </LocalizationProvider>
  );
}
