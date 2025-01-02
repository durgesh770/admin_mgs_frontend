// react import
import React, { useState } from "react";

//component
import ButtonCom from "@/components/ui/Button";

// mui
import { Button, Divider, Grid, Typography } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea/Textarea";

interface rescheduleRequest {
  //modal
  target?: React.ReactNode;
  open: boolean;
  setOpen: any;
  submit?: any;
}

const RescheduleRequest = ({
  target,
  open,
  setOpen,
  submit,
}: rescheduleRequest) => {
  const [value, setValue] = useState();
  const onChange = () => {};

  return (
    <>
      <Modal customOpen={open} customClose={setOpen} target={target}>
        <Grid
          className="pt-2"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: "1rem",
          }}
        >
          <Grid>
            <Button onClick={()=> setOpen(false)}>
              <ClearOutlinedIcon />
            </Button>
          </Grid>

          <Grid
            sx={{
              paddingLeft: "16%",
              "@media (max-width: 430px)": {
                paddingLeft: "12%",
              },
              "@media (max-width: 380px)": {
                paddingLeft: "8%",
              },
            }}
          >
            <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
              Reschedule Request
            </Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid className=" py-4">
          <Textarea
            value={value}
            onChange={onChange}
            textrows={4}
            label={"Description"}
          />
        </Grid>

        <Divider />

        {/* button component  */}
        <Grid className="StaffMemberCss pt-2">
          <Grid>
            <ButtonCom loading={false} btnType="secondary">Save</ButtonCom>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default RescheduleRequest;
