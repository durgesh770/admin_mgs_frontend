"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ClickableComponent from "../ClickableComponentProps";

interface DropdownProps {
  children: React.ReactNode;
  target: React.ReactNode;
}

export default function ButtonDropdown({ target, children }: DropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ClickableComponent onClick={handleClick}>{target}</ClickableComponent>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className="mt-3"
      >
        <ClickableComponent onClick={handleClose}>
          {children}
        </ClickableComponent>
      </Menu>
    </div>
  );
}
