import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ButtonCom from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import SelectComponent from "@/components/ui/Select";
import Input from "@/components/ui/Input";

import { getCouponDiscountPrice } from "@/hooks/Coupon";


const AddDiscountPopup = ({ amount, setData, defaultData }) => {
  const [open, setOpen] = useState(false);
  const [inputval, setInputval] = useState({ coupon: "", percentage: 0, fixed: 0 });
  const [selectedValue, setSelectedValue] = useState("coupon");
  const [subSelectedValue, setSubSelectedValue] = useState("");

  const handleChangeOpen = () => setOpen(!open);

  const handleSelectChange = (selected) => {
    setSelectedValue(selected);
    setSubSelectedValue(selected === "custom" ? "percentage" : "");
  };

  const handleSubSelectChange = (selected) => {
    setSubSelectedValue(selected);
    setSelectedValue("custom");
  };

  const renderInputField = (placeholder, type, valueKey) => (
    <div className="py-2">
      <Input
        borderline
        placeholder={placeholder}
        onChange={(e) => setInputval((prev) => ({ ...prev, [valueKey]: e.target.value }))}
        type={type}
        value={inputval[valueKey]}
        min={0}
      />
    </div>
  );
  useEffect(() => {
    if (defaultData) {
      setSelectedValue(defaultData.code ? "coupon" : "custom");
      setSubSelectedValue(defaultData?.custom?.customType);
      setInputval((prev) => ({
        ...prev,
        coupon: defaultData.code || "",
        [defaultData?.custom?.customType]: defaultData?.custom?.customValue || 0,
      }));
    }
  }, [defaultData]);


  let coupon = getCouponDiscountPrice();

  const handleSubmit = async () => {

    if (selectedValue == "coupon") {
      //coupon handle
      let res = await coupon.submit({
        "couponCode": inputval.coupon,
        "totalPrice": amount
      });

      if (!res?.discountedPrice) return;

      setData((old) => ({
        code: inputval.coupon,
        discountType: res.coupon.discountType,
        discountValue: res.coupon.discountValue,
      }));

      setInputval({ coupon: inputval.coupon, percentage: 0, fixed: 0 });
    } else {
      setData((old) => ({
        custom: {
          customType: subSelectedValue,
          customValue: Number(inputval[subSelectedValue]),
        },
      }));

      setInputval({ coupon: "", percentage: 0, fixed: 0, [subSelectedValue]: Number(inputval[subSelectedValue]) });
    }
    setOpen(false);
  }


  return (<>
    <span onClick={handleChangeOpen} className="text-blue-500 cursor-pointer">Add Discount </span>
    <Modal
      customOpen={open}
      customClose={() => setOpen(false)}
    >
      <div className="bg-[--brand-pastel-color] p-3 border border-gray-300 rounded-2xl  shadow-md">
        <div className="flex flex-row items-center justify-between">
          <Grid>
            <Button onClick={handleChangeOpen}>
              <ClearOutlinedIcon />
            </Button>
          </Grid>

          <Typography className="text-[--brand-color]" sx={{ fontSize: "22px", fontWeight: 600 }}>Add Discount</Typography>
          <div></div>
          <div></div>
        </div>
        <Divider />

        <Grid className="py-4">
          <SelectComponent
            label="Select For Discount"
            options={[{ value: "coupon", label: "Coupon" }, { value: "custom", label: "Custom" }]}
            value={selectedValue}
            onChange={handleSelectChange}
          />

          {selectedValue === "coupon" && renderInputField("ABCD41", "text", "coupon")}

          {selectedValue === "custom" && (
            <div className="py-2">
              <SelectComponent
                label="Choose Once Again"
                options={[{ value: "percentage", label: "%" }, { value: "fixed", label: "Fixed" }]}
                value={subSelectedValue}
                onChange={handleSubSelectChange}
              />
            </div>
          )}

          {subSelectedValue === "percentage" && renderInputField("20%", "number", "percentage")}

          {subSelectedValue === "fixed" && renderInputField("1234", "number", "fixed")}
        </Grid>

        <Divider />

        <Grid className="pt-6 StaffMemberCss">
          <div>
            <ButtonCom loading={coupon.loading} btnType="secondary" onClick={handleSubmit}>Submit</ButtonCom>
          </div>
        </Grid>
      </div>
    </Modal>
  </>

  );
};

export default AddDiscountPopup;
