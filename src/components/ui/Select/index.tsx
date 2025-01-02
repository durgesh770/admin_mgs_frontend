import * as React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectComponentProps {
  options: SelectOption[];
  value?: string;
  onChange: (selectedValue: string) => void;
  label: String;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="flex flex-col w-full input-container">
      <label htmlFor="teamMembers" className="input-label w-full ">
        {label}
      </label>
      <select
        style={{
          width: "100%",
          borderRadius: "3px",
          marginTop: "5px",
          border: "0.1px solid #a7a9ab",
        }}
        id="teamMembers"
        className={`border ${
          value ? "border-red-500" : "border-[#a7a9ab]"
        } w-1/4 h-[40px]`}
        value={value}
        onChange={handleSelectChange}
      >
        <option selected value={"none"} >Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
