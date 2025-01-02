import React, { useState } from "react";
import ColorPicker from "@/components/common/ColorPicker/ColorPicker";

const Colors = ({ setColors, color, title }: any) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleColorChange = (color: any) => {
    setColors(color.hex);
  };

  return (
    <div className=" cursor-pointer" >
      <div
        className={`border border-[--brand-light-gray-color] shadow-md p-5 h-[55px] w-[55px] rounded-full`}
        onClick={(event) => handleClick(event)}
        style={{ backgroundColor: color }}
      />
      <ColorPicker
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        value={color}
        handleColorChange={handleColorChange}
      />
      <span>{title}</span>
    </div>
  );
};

export default Colors;
