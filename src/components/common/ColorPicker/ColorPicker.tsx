import React, { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import { Popover } from "@mui/material";

interface ColorPickerProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: any;
  value: string;
  handleColorChange: any;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  anchorEl,
  setAnchorEl,
  value,
  handleColorChange,
}) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "color-popover" : undefined;

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <SketchPicker color={value} onChange={handleColorChange} />
      </Popover>
    </>
  );
};

export default ColorPicker;
