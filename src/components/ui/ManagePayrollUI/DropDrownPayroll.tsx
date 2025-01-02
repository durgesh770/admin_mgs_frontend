//react
import React from "react";
//mui
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
}

export default function DropDownSelect({
  data,
  setData,
  value,
}: DropDownSelectProps) {

  const pendingColor = "red";
  const completedColor = "green";

  const placeholderStyle = { color: pendingColor };
  
  const selectedValueStyle =
    value === "1" ? { color: pendingColor } : { color: completedColor };

  return (
    <>
      {/* Display dropdown label */}
      <h4 className="my-2 md:my-0">{data?.name}</h4>
      {/* Dropdown component */}
      <Select
        labelId="dropdown-select-label"
        id="dropdown-select"
        value={value || "none"}
        onChange={(e) => setData(e.target.value)}
        className="min-w-[150px] w-full h-[40px]"
        style={selectedValueStyle} // Set the style for the selected value
      >
        {/* Placeholder option */}
        <MenuItem disabled value={"none"} style={placeholderStyle}>
          <p>{data.placeHolder}</p>
        </MenuItem>

        {/* Render additional data */}
        {data?.data?.map((item: any, key: number) => (
          <MenuItem
            key={key}
            value={item.id}
            style={{ color: item.id === "1" ? pendingColor : completedColor }}
          >
            <p>{item.title !== undefined ? item.title : item.name}</p>
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
