"use client";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface DropDownSelectProps {
  data: {
    placeHolder: string;
    data: { title: string; id: string }[];
    name?: string;
  };
  setData: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  resetData?: any[];
}

export default function DropDownSelect({
  data,
  setData,
  value,
  resetData,
}:DropDownSelectProps) {
  return (
    <>
      {/* Display dropdown label */}
      <h4 className="my-2 md:my-0">{data?.name}</h4>
      {/* Dropdown component */}
      <Select
        labelId="dropdown-select-label"
        id="dropdown-select"
        value={value || 'none'}
        onChange={(e)=>setData(e.target.value)}
        className="min-w-[150px] w-full h-[40px]"
      >
        {/* Placeholder option */}
        <MenuItem disabled value={"none"}>
          <p>{data.placeHolder}</p>
        </MenuItem>
        {/* Render reset data */}
        {resetData?.map((item:any, key:number) => (
          <MenuItem key={key} value={item.id}>
            <p>{item.title}</p>
          </MenuItem>
        ))}
        {/* Render additional data */}
        {data?.data?.map((item:any, key:number) => (
          <MenuItem key={key} value={item.id}>
            <p>{item.title !== undefined ? item.title : item.name}</p>
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
