//@ts-nocheck

// react import
import React, { useState } from "react";

//component
import Modal from "@/components/ui/Modal";
import ButtonCom from "@/components/ui/Button";

// mui
import { Button, Divider, Grid } from "@mui/material";
import SideLabelInput from "@/components/ui/Input/SideLabelInput";
import { ClearOutlined } from "@mui/icons-material";
import WarningModal from "@/components/ui/Modal/Warning";
import ColorSelectorfeature from "@/features/ColorSelectorfeature/ColorSelectorfeature";

// interface for props
interface EditProfileProps {
  data: any;
  setData: any;
  handleSubmit: any;
  handleDelete: any;
  loading: any;

  active: boolean;
}

const EditProfile: React.FC<EditProfileProps> = ({
  data,
  setData,
  handleDelete,
  handleSubmit,
  loading,

  active
}) => {
  // state
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Modal customOpen={open} customClose={setOpen} target={<span>Edit</span>}>
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
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: "1rem",
              }}
            >
              <div>
                <Button onClick={() => setOpen(false)}>
                  <ClearOutlined />
                </Button>
              </div>
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
                <span style={{ fontSize: "24px", fontWeight: 600 }}>
                  {" "}
                  Edit Personal Info{" "}
                </span>
              </Grid>
            </Grid>

            <Divider />
            <div className="max-h-[70vh] overflow-y-auto">
              <Grid sx={{ padding: "30px" }}>
                <div className="my-2">
                  <SideLabelInput
                    dynamicwidth={"180px"}
                    label={"Name"}
                    value={data.name}
                    handleChange={(e: any) =>
                      setData((old: any) => ({ ...old, name: e.target.value }))
                    }
                  />
                </div>

                <div className="my-2">
                  <SideLabelInput
                    dynamicwidth={"180px"}
                    label={"Email"}
                    value={data.email}
                    handleChange={(e: any) =>
                      setData((old: any) => ({ ...old, email: e.target.value }))
                    }
                  />
                </div>

                <div className="my-2">
                  <SideLabelInput
                    dynamicwidth={"180px"}
                    label={"Phone Number"}
                    value={data.telephone}
                    handleChange={(e: any) =>
                      setData((old: any) => ({
                        ...old,
                        telephone: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="my-2">
                  <SideLabelInput
                    dynamicwidth={"180px"}
                    label={"Team Member"}
                    value={data.teamMemberId}
                    handleChange={(e: any) =>
                      setData((old: any) => ({
                        ...old,
                        teamMemberId: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="my-2">
                  <ColorSelectorfeature
                    data={data.color}
                    setData={(color: string) =>
                      setData((old: any) => ({ ...old, color }))
                    }
                  />
                </div>
              </Grid>
              <Divider />

              <WarningModal
                open={modalOpen}
                handleLeftbtn={handleDelete}
                updateOpen={() => setModalOpen(false)}
                handleRightbtn={() => setModalOpen(false)}
                title={
                  "Are you sure you want to Disable this? It is an irreverisble action, Please Confirm!"
                }
                loading={false}
                btnSec={"No"}
                btnfirst={"Yes"}
              />

              <Grid className="px-2 py-2 StaffMemberCss">
                <div>
                  {
                    active ? <ButtonCom
                      btnType="delete"
                      onClick={() => setModalOpen(true)}
                    >
                      Disable
                    </ButtonCom>
                      :
                      <ButtonCom
                        btnType="green"
                        onClick={() => setModalOpen(true)}
                      >
                        Enable
                      </ButtonCom>

                  }

                </div>
                <div>
                  <ButtonCom
                    loading={loading}
                    btnType="secondary"
                    onClick={handleSubmit}
                  >
                    Save
                  </ButtonCom>
                </div>
              </Grid>
            </div>
          </Grid>
        )}
      </Modal>
    </>
  );
};

export default EditProfile;
