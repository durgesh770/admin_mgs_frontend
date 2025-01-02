//@ts-nocheck
"use client";
//react
import React, { useState } from "react";
import { useParams } from "next/navigation";

//  mui imports
import { Grid, Typography } from "@mui/material";

// component imports
import Switch from "@/components/ui/Switch";
import Header from "@/components/ui/Header";

// hoooks
import { RoleService } from "@/services";
import Tab from "@/components/ui/Tabs/Tab";
import { stringToSlug } from "@/utils/tools";
import MUIcon from "@/components/common/Icon";
import ButtonCom from "@/components/ui/Button";
import EditIcon from "@mui/icons-material/Edit";
import { GetSingleRole } from "@/interface/Role";
import SelectPermission from "../SelectPermission";
import { useSnackbar } from "@/context/GlobalContext";
import { formatApiResponse } from "@/utils/functions";
import ViewListIcon from "@mui/icons-material/ViewList";
import WarningModal from "@/components/ui/Modal/Warning";
import { getRoleInfo, getSingleRole } from "@/hooks/Role";
import SideLabelInput from "@/components/ui/Input/SideLabelInput";
import { managePermissionData } from "@/hooks/Role/SelectPermission";
import ViewAccessComponent from "@/components/ui/TeamMember/Permissions/ViewAccess";

const EditPermissionPage = () => {
  //integration
  const { id } = useParams();
  const roleData = getSingleRole(id);

  return (
    <>
      {roleData.loading || roleData.data == null ? (
        ""
      ) : (
        <EditPermissionComponent roleData={roleData.data} />
      )}
    </>
  );
};

// interface for props
interface EditPermissionProps {
  roleData: GetSingleRole;
}

const EditPermissionComponent = ({ roleData }: EditPermissionProps) => {
  //integration
  const [title, setTitle] = useState(roleData.title);
  const [switchValue, setSwitchValue] = useState(roleData.fullAccess);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  //integration
  const roleInfo = getRoleInfo(roleData?.roleId);

  const { permissionData, setpermissionData, filteredPermissions } =
    managePermissionData();

  let alert = useSnackbar();
  // handle submit
  const handleSubmit = async () => {
    setLoading(true);
    let body = {
      title: title,
      roleId: stringToSlug(title),
      fullAccess: switchValue,
      permissions: filteredPermissions,
    };

    let data = await RoleService.updateRole(roleData.id, body).catch((err) => {
      setLoading(false);
      alert.SnackbarHandler(
        true,
        "error",
        err.response?.data?.message || "An error occurred"
      );
    });

    if (data?.success) {
      setLoading(false);
      alert.SnackbarHandler(true, "success", "Role Updated successfully");
      window.location.href = "/permissions";
    }
  };

  const handleConfirmbtn = () => {
    setIsLoading(true);
    RoleService.deleteRole(roleData.id)
      .catch((err) => {
        alert.SnackbarHandler(
          true,
          "error",
          err.response?.data?.message || "An error occurred"
        );
      })
      .then((res) => {
        setIsLoading(false);
        if (res?.success) {
          setModalOpen(false);
          alert.SnackbarHandler(true, "success", "Role Delted successfully");
          window.location.href = "/permissions";
        }
      });
  };

  const tabs = [
    { label: "View", icon: <ViewListIcon /> },
    { label: "Edit", icon: <EditIcon /> },
  ];

  return (
    <>
      <div className="min-h-screen ">
        <div className="bg-white border border-[--brand-light-gray-color]  p-5 w-fit m-auto min-h-screen ">
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
              title={"Manage Role set"}
              path={"permissions"}
              rightSide={
                <>
                  <div className="flex flex-row gap-3 mb-4">
                    <ButtonCom
                      loading={loading}
                      onClick={handleSubmit}
                      btnType="secondary"
                    >
                      Save
                    </ButtonCom>

                    <ButtonCom
                      onClick={() => setModalOpen(true)}
                      btnType="delete"
                    >
                      Delete
                    </ButtonCom>
                  </div>
                </>
              }
            />

            <Tab
              value={active}
              setValue={(val) => setActive(val)}
              tabs={tabs}
            />
            {active == 1 && (
              <Grid className="mt-4">
                <Grid>
                  {/* side label input component  */}
                  <SideLabelInput
                    label={"Permission set name"}
                    dynamicwidth={"200px"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Permission set name"
                  />
                </Grid>

                <Grid
                  sx={{
                    marginTop: "1rem",
                    fontFamily: "var(--mulish)",
                    "@media (max-width: 1024px)": {
                      padding: ".5rem .5rem",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontFamily: "var(--mulish)",
                      fontSize: "1.2rem",
                      "@media (max-width: 352px)": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    Customize this set of permissions
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    Customize the permissions below to tailor the way team
                    members with this permission set use square.
                  </Typography>
                </Grid>

                <Grid
                  sx={{
                    border: "1px solid #c3c3c3",
                    fontFamily: "var(--mulish)",
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
                      fontFamily: "var(--mulish)",
                      color: "#8E8E8E",
                    }}
                  >
                    This enables all permissions except managing bank accounts.
                    Only the account can manage bank accounts.
                  </Typography>
                </Grid>

                {/* select permission component*/}

                <SelectPermission
                  access={switchValue}
                  setAccess={setSwitchValue}
                  setData={setpermissionData}
                  defaultData={roleData.permissions}
                />
              </Grid>
            )}

            {active == 0 && roleInfo.data && (
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {formatApiResponse(roleInfo.data).map((item) => {
                  return (
                    <div className="mb-5">
                      <MUIcon
                        iconName={item.icon}
                        style={{ color: item.iconColor }}
                      />
                      <span className="ml-2 font-bold">{item.title}</span>
                      <div className="flex flex-col gap-1 mt-3 permissions">
                        {item.roles.map((role) => {
                          return <li className="">{role}</li>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Grid>
        </div>
      </div>

      <WarningModal
        open={modalOpen}
        updateOpen={() => setModalOpen(false)}
        handleConfirmbtn={() => setModalOpen(false)}
        title={
          "Are you sure you want to delete this? It is an irreverisble action, Please Confirm!"
        }
        btnfirst={"Delete"}
        btnSec={"Cancel"}
        handleLeftbtn={() => handleConfirmbtn()}
        loading={isLoading}
      />
    </>
  );
};

export default EditPermissionPage;
