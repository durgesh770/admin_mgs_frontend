// @ts-nocheck

import React from "react";
import { SvgIconComponent } from "@mui/icons-material";
import * as MuiIcons from "@mui/icons-material";

const MUIcon = ({ iconName = "", ...props }) => {
  // Check if the requested icon exists in the DynamicIcon object
  const Icon: SvgIconComponent | undefined = MuiIcons[iconName];

  // If the icon exists, render it; otherwise, render a fallback icon or placeholder
  return Icon ? <Icon {...props} /> : <FallbackIcon />;
};

// Placeholder or fallback icon component
const FallbackIcon = () => {
  // You can customize this component to render a default icon or placeholder
  return <div>Icon Not Found</div>;
};

export default MUIcon;
