"use client";
//component imports
import React, { useEffect, useState } from "react";

//  mui imports
import { Grid, Typography } from "@mui/material";

// component imports
import Switch from "@/components/ui/Switch";
import Header from "@/components/ui/Header";
import SelectPermission from "@/features/Permissions/SelectPermission";
import { stringToSlug } from "@/utils/tools";
import { RoleService } from "@/services";
import SideLabelInput from "@/components/ui/Input/SideLabelInput";

//context
import { useSnackbar } from "@/context/GlobalContext";
import { managePermissionData } from "@/hooks/Role/SelectPermission";
import ButtonCom from "@/components/ui/Button";

const CreatePermission = () => {
  let alert = useSnackbar();
  const { permissionData, setpermissionData, filteredPermissions } =
    managePermissionData();

  // state
  const [switchValue, setSwitchValue] = useState(false);
  const [isCardVisible, setCardVisible] = useState(window.innerWidth >= 800);
  const [isDrawerOpen, setDrawerOpen] = useState(window.innerWidth < 800);
  //integration
  const [formData, setFormData] = useState({
    title: "",
  });

  const [loading, setLoading] = useState(false);

  // handle card and drawar on diffrent screens
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 800) {
        setCardVisible(false);
        setDrawerOpen(true);
      } else {
        setCardVisible(true);
        setDrawerOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // handle role
  const handleRoleName = (value: string) => {
    setFormData((old) => ({ ...old, title: value }));
  };

  // handle submit
  const handleSubmit = async () => {
    setLoading(true);
    let body = {
      title: formData.title,
      roleId: stringToSlug(formData.title),
      fullAccess: switchValue,
      permissions: filteredPermissions,
    };

    let data = await RoleService.createRole(body).catch((err) => {
      setLoading(false);
      alert.SnackbarHandler(
        true,
        "error",
        err.response?.data?.message || "An error occurred"
      );
    });

    if (data?.success) {
      setLoading(false);
      alert.SnackbarHandler(true, "success", "Role created successfully");
      window.location.href = "/permissions";
    }
  };

  return (
    <>
      <div className="min-h-screen ">
        <div className="  bg-[--brand-white-color] border border-[--brand-light-gray-color]  w-fit  m-auto pb-28  p-5 min-h-screen ">
          <Grid
            sx={{
              width: "46rem",
              margin: "auto",
              paddingBottom: "70px",
              "@media (max-width: 1060px)": {
                width: "100%",
              },
            }}
          >
            <Header
              title={"New Role set"}
              path={'permissions'}
              rightSide={
                <>
                  <ButtonCom
                    loading={loading}
                    onClick={handleSubmit}
                    btnType="secondary"
                  >
                    Save
                  </ButtonCom>
                </>
              }
            />

            <Grid>
              <Grid>
                {/* side label input component  */}
                <SideLabelInput
                  label={"Permission set name"}
                  placeholder="Permission set name"
                  value={formData.title}
                  handleChange={(e: any) => handleRoleName(e.target.value)}
                  dynamicwidth={"200px"}
                />
              </Grid>

              <Grid
                sx={{
                  marginTop: "1rem",
                  "@media (max-width: 1024px)": {
                    padding: ".5rem .5rem",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    fontFamily: "var(--mulish)",
                    "@media (max-width: 352px)": {
                      fontSize: "14px",
                    },
                  }}
                >
                  {" "}
                  Customize this set of permissions
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  Customize the permissions below to tailor the way team members
                  with this permission set use square.
                </Typography>
              </Grid>

              <Grid
                sx={{
                  border: "1px solid #c3c3c3",
                  marginTop: "1rem",
                  padding: "2rem 2rem",
                  "@media (max-width: 1024px)": {
                    padding: "1rem 10px",
                  },
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: "10px",
                  }}
                >
                  <Switch
                    switchValue={switchValue}
                    setSwitchValue={setSwitchValue}
                  />
                  <Typography>Full Access</Typography>
                </Grid>

                <Typography
                  sx={{
                    marginLeft: "52px",
                    color: "#8E8E8E",
                  }}
                >
                  This enables all permissions except managing bank accounts.
                  Only the account can manage bank accounts.
                </Typography>
              </Grid>

              {/* select permission component */}
              <SelectPermission
                access={switchValue}
                setAccess={setSwitchValue}
                setData={setpermissionData}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default CreatePermission;
