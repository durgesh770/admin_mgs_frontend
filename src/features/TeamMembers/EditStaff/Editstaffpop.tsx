// react import
import React, { useState } from "react";

//component
import Modal from "../../../components/ui/Modal";
import ButtonCom from "@/components/ui/Button";
import DynamicTable from "@/components/ui/Table";

// mui
import { Button, Grid, Typography } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Checkbox from "@mui/material/Checkbox";

// type
type TableFormatItem = {
  title: {
    bold: boolean;
    type: "custom";
    value: React.ReactNode;
  };
};

const Editstaffpop = () => {
  // state
  const [open, setOpen] = useState(false);

  // row data
  const dataRow = [
    { name: "1. BRAND NEW -FULL BODY" },
    { name: "7. THANKFULL - half legs / arms, toes fingers hands" },
    { name: "8. QUICKIE - brazilian / full legs" },
    { name: "9 SILKY - full front + half back" },
    { name: "9.1 BASIC - full face + underaems+bikini" },
    { name: "No show fee" },
    { name: "Women - Laser Hair Removal - Hair line" },
    { name: "Women - Laser Hair Removal - Neck" },
    { name: "Women Laser Hair Removel -Butt Cheeks" },
    { name: "Women - Laser Hair Removal - Full Back" },
    { name: "Women - Laser Hair Removal - Half Back" },
    { name: "Hands + Fingers" },
    { name: "Feet + Toes" },
    { name: "Toes + Fingers" },
  ];

  // table formate data
  let tableFormat: TableFormatItem[] = dataRow.map((day, index) => {
    return {
      title: {
        bold: false,
        type: "custom",
        value: (
          <span>
            {" "}
            <Checkbox />
            {day.name}
          </span>
        ),
      },
    };
  });

  return (
    <>
      <Modal
        customOpen={open}
        customClose={setOpen}
        target={<span className="font-semibold">Edit</span>}
      >
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
            <Button onClick={()=>setOpen(false)}>
              <ClearOutlinedIcon />
            </Button>
          </Grid>

          <Grid
            sx={{
              paddingLeft: "20%",
              "@media (max-width: 430px)": {
                paddingLeft: "15%",
              },
              "@media (max-width: 380px)": {
                paddingLeft: "8%",
              },
            }}
          >
            <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
              Edit Staff
            </Typography>
          </Grid>
        </Grid>

        {/* table component  */}
        <Grid
          sx={{
            height: "25rem",
            overflow: "auto",
            margin: "auto",
            width: "100%",
          }}
        >
          <DynamicTable columns={[]} data={tableFormat} />
        </Grid>

        {/* button component  */}
        <Grid className="StaffMemberCss">
          <Grid>
            <ButtonCom loading={false} btnType="delete">Delete</ButtonCom>
          </Grid>
          <Grid>
            <ButtonCom loading={false} btnType="secondary">Save</ButtonCom>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default Editstaffpop;
