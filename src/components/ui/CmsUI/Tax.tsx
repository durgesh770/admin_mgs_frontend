import React from "react";
import Input from "../Input";
import Button from "../Button";

interface TaxFeatureProps {
  tax: number;
  setTax: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: () => void;
  loading: boolean;
  isDisable: boolean;
  setDisable: React.Dispatch<React.SetStateAction<any>>;
}

const Tax = ({
  tax,
  setTax,
  handleSubmit,
  loading,
  isDisable,
  setDisable,
}: TaxFeatureProps) => {
  return (
    <div className="mt-12 md:px-12 bg-[--brand-pastel-color]  border border-[--brand-light-gray-color] rounded-lg shadow-md p-5 lg:w-[40vw] m-auto ">
      <Input
        className="mb-8"
        label="Tax"
        value={tax}
        placeholder="tax"
        borderline={true}
        onChange={(e) => {
          setTax(e.target.value), setDisable(false);
        }}
      />
      <div className="w-fit ">
        <Button
          onClick={handleSubmit}
          btnType={`${isDisable ? "disabled" : "primary"}`}
          isDisable={isDisable}
          loading={loading}
        >
          Update Tax
        </Button>
      </div>
    </div>
  );
};

export default Tax;
