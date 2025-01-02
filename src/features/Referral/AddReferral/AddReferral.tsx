"use client";
// React
import React, { useEffect} from "react";
import { useRouter, useSearchParams } from "next/navigation";
// Components
import ButtonCom from "@/components/ui/Button/index";
import SideDrawer from "@/components/ui/SideDrawer";
import Input from "@/components/ui/Input";
import Autocomplete from "@/components/ui/Autocomplete/Autocomplete";
// Hooks
import {
  useCreateReferral,
  useUpdateReferral,
} from "@/hooks/ManageReferral";
import { getCustomers } from "@/hooks/Customer";
// Material UI
import { removeQuery } from "@/utils/tools";

export const AddReferral = ({
  setAddReferral,
  addReferral,
  setValue,
  setInputData,
  value,
  inputData,
  title,
  currentTab,
}: any) => {
  const router = useRouter();
  // State
  const searchParams = useSearchParams();
  // Custom Hooks
  const { data } = getCustomers({ defaultParams: {} });
  const createReferral = useCreateReferral();
  const  updateReferral = useUpdateReferral();
  // Check for new referral parameter in search params
  const newReferral = searchParams.get("new_referral");
  const globalLoading = createReferral.loading ? createReferral.loading : updateReferral.loading

  // Effect to handle new referral parameter
  useEffect(() => {
    if (newReferral) setAddReferral(true);
  }, [newReferral]);

  // Format data according to discount type
  const formatePercent = {
    customer: value.id,
    discountPercentage: parseInt(inputData.discount, 10),
  };

  // Handle submit action
  const handleSubmit = () => {
    if (currentTab == 1) {
      updateReferral.handleUpdate(
        value.id,
        {
          discountPercentage: parseInt(inputData.discount, 10),
        }
      );
    } else {
      createReferral.handleCreate(formatePercent);
    }
  };

  // Options for autocomplete
  const options = data.map((item) => ({ title: item.name, id: item._id}));

  return (
    <SideDrawer
      open={addReferral}
      onClose={() => {
        setAddReferral(false), removeQuery(router, ["new_referral"]);
      }}
      title={title.heading}
      headerHidden={true}
    >
      <div className="px-6 py-4 sm:px-11">
        <div className="mb-5">
          <span className=" font-bold">Select Customer</span>
          <Autocomplete
            setValue={setValue}
            value={value}
            list={options}
            label={"Name"}
            placeholder="Name"
            useSideLabel={true}
            disabled={title.disable}
          />
        </div>

        <Input
          className="mb-5"
          label="Coupon Code"
          value={inputData.couponcode}
          placeholder="Coupon Code (Optional)"
          onChange={(e) =>
            setInputData((prevData: any) => ({
              ...prevData,
              couponcode: e.target.value,
            }))
          }
          borderline={true}
          disabled={title.disable}
        />

        <Input
          className="mb-8"
          label="Discount Percentage"
          value={inputData.discount}
          placeholder="Discount Percentage"
          onChange={(e) =>
            setInputData((prevData: any) => ({
              ...prevData,
              discount: e.target.value,
            }))
          }
          borderline={true}
          type="number"
          min={0}
        />

        <ButtonCom
          loading={globalLoading}
          onClick={handleSubmit}
          btnType="secondary"
        >
          Submit
        </ButtonCom>
      </div>
    </SideDrawer>
  );
};
