"use client";
import * as React from "react";
import ModalCom from "@mui/material/Modal";
import ClickableComponent from "../ClickableComponentProps";
import { Grid } from "@mui/material";

interface ModalProps {
  children: React.ReactNode;
  target?: React.ReactNode;
  customOpen?: boolean;
  customClose?: (open: boolean) => void;
}

export default function Modal({
  target,
  children,
  customOpen,
  customClose,
}: ModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (customClose) {
      customClose(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (customClose) {
      customClose(false);
    }
  };

  React.useEffect(() => {
    if (customOpen !== undefined) {
      setIsOpen(customOpen);
    }
  }, [customOpen]);

  return (
    <>
      <ClickableComponent onClick={handleOpen}>{target}</ClickableComponent>

      <ModalCom
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="blurred-modal-title"
        aria-describedby="blurred-modal-description"
      >
        <Grid
          className=" rounded-2xl  border border-gray-300 shadow-md "
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            padding: 1,
            minWidth: "48vh",
            "@media (max-width: 540px)": {
              minWidth: "100%",
              maxHeight:"100%"
            }
          }}

        >
          {children}
        </Grid>
      </ModalCom>
    </>
  );
}
