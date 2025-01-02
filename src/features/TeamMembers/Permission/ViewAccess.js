// react import
import React, { useState } from "react";

//component
import Modal from "@/components/ui/Modal";

// mui
import { Button, Divider, Grid } from "@mui/material";
import { ClearOutlined } from "@mui/icons-material";

import ViewAccessComponent from "@/components/ui/TeamMember/Permissions/ViewAccess"
import { getRoleInfo } from "@/hooks/Role";
import { formatApiResponse } from "@/utils/functions";


const ViewAccess = ({
  roleId
}) => {
  // state
  const [open, setOpen] = useState(false);
  const roleInfo = getRoleInfo(roleId)

  return (
    <>
      <Modal customOpen={open} customClose={setOpen} target={<span>View Access</span>}>
        {open && (
          <Grid
            sx={{
              width: "35rem",
              "@media (max-width: 500px)": {
                width: "100%",
              },
              "@media (max-width: 410px)": {
                margin: "auto",
                width: "22rem",
              },
              "@media (max-width: 360px)": {
                width: "20rem",
              },
            }}
            className="ModalbgCss"
          >
            <Grid
              className="pt-4"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: "1rem",
              }}
            >
              <Grid>
                <Button onClick={() => setOpen(false)}>
                  <ClearOutlined />
                </Button>
              </Grid>
              <Grid
                sx={{
                  paddingLeft: "20%",
                  "@media (max-width: 600px)": {
                    paddingLeft: "8%",
                  },
                  "@media (max-width: 500px)": {
                    paddingLeft: "5%",
                  },
                }}
              >
                <span style={{ fontSize: "24px", fontWeight: 600 }}> </span>
              </Grid>
            </Grid>

            <Divider />
            <Grid sx={{ padding: "30px" }}>

              {roleInfo.data && <ViewAccessComponent data={formatApiResponse(roleInfo.data)} />}

            </Grid>
            <Divider />

            <Grid className="px-2 py-2 StaffMemberCss">

            </Grid>
          </Grid>
        )}
      </Modal>
    </>
  );
};

export default ViewAccess;
