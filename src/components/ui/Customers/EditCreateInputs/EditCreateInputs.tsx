import React from "react";
import SideLabelInput from "../../Input/SideLabelInput";
import Textarea from "../../Textarea/Textarea";

const EditCreateInputs = ({ setFromData, formData }: any) => {
  return (
    <>
      <div className="py-6 ">
        <SideLabelInput
          label="Full Name"
          dynamicwidth={"180px"}
          value={formData.name}
          placeholder="Full Name"
          onChange={(e) =>
            setFromData((pre: any) => ({ ...pre, name: e.target.value }))
          }
        />
        <SideLabelInput
          label="Phone Number"
          dynamicwidth={"180px"}
          value={formData.phone}
          placeholder="Phone Number"
          onChange={(e) =>
            setFromData((pre: any) => ({ ...pre, phone: e.target.value }))
          }
        />
        <SideLabelInput
          label="Email Address"
          dynamicwidth={"180px"}
          value={formData.email}
          placeholder="Email Address"
          onChange={(e) =>
            setFromData((pre: any) => ({ ...pre, email: e.target.value }))
          }
        />

        <Textarea
          label={"Address"}
          textrows={4}
          value={formData.address}
          onChange={(e: any) =>
            setFromData((pre: any) => ({ ...pre, address: e.target.value }))
          }
        />
        <SideLabelInput
          label="Reference ID"
          dynamicwidth={"180px"}
          value={formData.RefId}
          placeholder="Reference ID"
          onChange={(e) =>
            setFromData((pre: any) => ({ ...pre, RefId: e.target.value }))
          }
        />
        <div className="block border border-gray-200 lg:flex ">
          <span
            style={{ width: "180px" }}
            className={` inline-flex items-center pl-2 text-md text-black font-bold lg:bg-[--brand-pastel-color] p-2 lg:border lg:border-gray-200 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600  `}
          >
            Birthday
          </span>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) =>
              setFromData((pre: any) => ({ ...pre, dob: e.target.value }))
            }
            id="website-admin"
            className={` text-gray-900 focus:border-gray-100 block flex-1 min-w-0 w-full text-sm md:border border-0 border-gray-200 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[--brand-white-color] dark:focus:ring-0 dark:focus:border-gray-100 bg-[--brand-white-color]`}
            placeholder="Birthday"
          />
        </div>
      </div>
    </>
  );
};

export default EditCreateInputs;
