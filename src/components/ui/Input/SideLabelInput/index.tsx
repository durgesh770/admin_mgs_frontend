import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  handleChange?: any;
  dynamicwidth?: string;
}

const SideLabelInput = ({
  handleChange,
  label,
  value,
  dynamicwidth,
  ...restProps
}: InputProps) => {
  return (
    <>
      <div className="block border border-gray-200 lg:flex   ">
        <span
          style={{ width: dynamicwidth }}
          className={` inline-flex items-center pl-2 text-lg text-black font-bold lg:bg-[--brand-pastel-color] p-2 lg:border lg:border-gray-200 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600  `}
        >
          {label}
        </span>

        <input
          type="text"
          value={value}
          onChange={handleChange}
          id="website-admin"
          className={` text-gray-900 focus:border-gray-100 block flex-1 min-w-0 w-full text-sm lg:border border-0 border-gray-200 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[--brand-white-color] dark:focus:ring-0 dark:focus:border-gray-100 bg-[--brand-white-color]`}
          {...restProps}
        />
      </div>
    </>
  );
};

export default SideLabelInput;
