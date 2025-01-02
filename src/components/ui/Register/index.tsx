import * as React from "react";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/Input/HiddenInput";
import Button from "@/components/ui/Button";
import Checkbox from "@mui/material/Checkbox";

export default function Register() {
  return (
    <>
      <div className="card min-[415px]:" style={{ padding: "20px" }}>
        <h4 className="heading-title mt-5 mb-6 text-[18px]">NEW CUSTOMER</h4>
        <Input
          className="mb-5"
          label="FULL NAME"
          placeholder="Enter your full name"
        />
        <Input
          className="mb-5"
          label="EMAIL ADDRESS"
          placeholder="Enter your email address"
        />
        <Input
          className="mb-5"
          label="PHONE NUMBER"
          placeholder="Enter your phone number"
        />
        <PasswordInput label="PASSWORD" placeholder="*******************" />
        <div className="flex items-start">
          <Checkbox />
          <h6 className="underline mb-8 mt-2 text-[10px] break-words">
            I accept the{" "}
            <span className="heading-title underline">
              T&C, Privacy Policy, Booking Policy,<br></br> Refunds &
              Cancellation Policy
            </span>
          </h6>
        </div>
      </div>
      <Button loading={false} className="w-full h-[50px]" btnType="primary">
        PROCEES
      </Button>
      <h6 className="mt-3 text-[14px]">
        Already a Customer?{" "}
        <span className="heading-title underline">Click here to login</span>
      </h6>
    </>
  );
}
