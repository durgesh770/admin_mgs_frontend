"use client";
// react
import React, { useState } from "react";

// component
import WarningModal from "@/components/ui/Modal/Warning";
import Button from "@/components/ui/Button";
import { AddReferral } from "../AddReferral/AddReferral";
import { ReferralTable } from "../ReferralTable/ReferralTable";
// hooks
import {
  useApproveReferral,
  useDeleteReferral,
  useGetReferrals,
  useHandleOptionsReferral,
  useRejectReferral,
} from "@/hooks/ManageReferral";
import { PermissionAccess } from "@/middleware/PermissionAccess";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
export const AllReferral = () => {
  // integration
  const { handleApprove } = useApproveReferral();
  const { handleReject } = useRejectReferral();
  const { handleDelete } = useDeleteReferral();
  const { data, loading, refetch } = useGetReferrals();
  const [warningModalOpen, setWarninigModalOpen] = useState(false);
  const [addReferral, setAddReferral] = useState(false);

  // hook for manage handle options
  const {
    value,
    setValue,
    handleRejectbtn,
    handleApprovebtn,
    handleOptions,
    warning,
    setWarning,
    title,
    inputData,
    setTitle,
    setInputData,
    current,
  } = useHandleOptionsReferral({
    setWarninigModalOpen,
    handleReject,
    handleApprove,
    handleDelete,
    refetch,
    setAddReferral,
  });

  const HandleAddReferral = () => {
    setValue("");
    setInputData({
      discount: "",
      couponcode: "",
    });
    setTitle({
      heading: "Add Referral",
      disable: false,
    });
    setAddReferral(true);
  };

  return (
    <>
      <div className="bg-[--brand-white-color] border border-[--brand-light-gray-color] m-auto  p-4  xl:w-[58vw] min-h-screen">
        {/* <div className="min-h-screen pt-4 sm:max-w-[65vw] m-auto bg-white"> */}
        <div className="flex flex-row items-center justify-between pt-4 mb-6 gap-7">
          <h1 className="mb-0 font-bold  md:text-[1.8rem] text-[1.5rem] ">
            All Referrals
          </h1>

          <PermissionAccess requiredPermissions={["create_referral"]}>
            <div className="md:block hidden">
              <Button
                loading={false}
                btnType={"secondary"}
                onClick={HandleAddReferral}
              >
                Add Referral
              </Button>
            </div>
            <div className="block md:hidden">
              <AddCircleOutlineOutlinedIcon
                className="transform scale-125"
                onClick={HandleAddReferral}
              />
            </div>
          </PermissionAccess>
        </div>

        <ReferralTable
          loading={loading}
          tableData={data}
          handleOptions={handleOptions}
        />
      </div>

      <WarningModal
        open={warningModalOpen}
        updateOpen={() => setWarninigModalOpen(false)}
        title={warning.title}
        handleLeftbtn={handleApprovebtn}
        handleRightbtn={handleRejectbtn}
        btnfirst={warning.btnFirstName}
        btnSec={warning.btnSecName}
      />

      <AddReferral
        addReferral={addReferral}
        setAddReferral={setAddReferral}
        value={value}
        inputData={inputData}
        setInputData={setInputData}
        setValue={setValue}
        title={title}
        currentTab={current}
      />
    </>
  );
};
