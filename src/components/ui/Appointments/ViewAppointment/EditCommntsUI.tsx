import React from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Textarea } from "flowbite-react";

interface AddCommentsUIProps {
  formData: {
    areaTested: string;
    spotSize: string;
    energyPulse: string;
    numOfPulse: string;
    dcdSprayDelay: string;
    adminComment: string;
    customerComment: string;
  };
  handleInputChange: (key: string, value: string) => void;
  handleSave: () => void;
  loading: boolean;
}

const EditCommentsUI = ({
  formData,
  handleInputChange,
  handleSave,
  loading,
}: AddCommentsUIProps) => {
  return (
    <>
      <div className="px-6 py-4 gap-6 overflow-auto">
        <div className="py-2">
          <Input
            label={"Area Tested"}
            borderline={true}
            placeholder="Area Tested"
            value={formData.areaTested}
            onChange={(e) => handleInputChange("areaTested", e.target.value)}
          />
        </div>
        <div className="py-2">
          <Input
            label={"Spot Size(mm)"}
            borderline={true}
            placeholder="Spot Size(mm)"
            value={formData.spotSize}
            onChange={(e) => handleInputChange("spotSize", e.target.value)}
          />
        </div>
        <div className="py-2">
          <Input
            label={"Energy/Pulse Width(J/cm2 & ms)"}
            borderline={true}
            placeholder="Energy/Pulse Width(J/cm2 & ms)"
            value={formData.energyPulse}
            onChange={(e) => handleInputChange("energyPulse", e.target.value)}
          />
        </div>
        <div className="py-2">
          <Input
            label={"# of Pulse"}
            borderline={true}
            placeholder="# of Pulse"
            value={formData.numOfPulse}
            onChange={(e) => handleInputChange("numOfPulse", e.target.value)}
          />
        </div>
        <div className="py-2">
          <Input
            label={"DCD Spray/Delay"}
            borderline={true}
            placeholder="DCD Spray/Delay"
            value={formData.dcdSprayDelay}
            onChange={(e) => handleInputChange("dcdSprayDelay", e.target.value)}
          />
        </div>
        <div className="py-2">
          <label className="input-label">Admin Comment</label>
          <Textarea
            rows={2}
            placeholder="Admin Comment"
            value={formData.adminComment}
            onChange={(e) => handleInputChange("adminComment", e.target.value)}
            className="bg-[--brand-white-color] border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[--brand-white-color] dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="py-2">
          <label className="input-label">Customer Comment</label>
          <Textarea
            rows={4}
            placeholder="Customer Comment"
            value={formData.customerComment}
            onChange={(e) =>
              handleInputChange("customerComment", e.target.value)
            }
            className="bg-[--brand-white-color] border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[--brand-white-color] dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        
        <div className="py-6">
          <Button loading={loading} btnType="secondary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditCommentsUI;
