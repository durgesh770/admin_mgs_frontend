"use client";
import * as React from "react";

interface FreeSoloCreateOptionprops {
  list: any;
  label?: string;
  value: any;
  setValue: any;
  disabled?: boolean;
  placeholder?: string;
  useSideLabel: boolean;
}

interface OptionType {
  title: string;
  id?: number;
}

export default function Autocomplete({
  list,
  label,
  setValue,
  value,
  disabled,
  placeholder,
  useSideLabel,
}: FreeSoloCreateOptionprops) {
  const [filteredlist, setFilteredlist] = React.useState<OptionType[]>(list);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const lowercaseInputValue = inputValue.toLowerCase();
    const filtered = list.filter((item: any) =>
      item.title.toLowerCase().includes(lowercaseInputValue)
    );
    setFilteredlist(filtered);
    setValue({ title: inputValue });
    setShowDropdown(inputValue.length > 0);
  };

  const handleSelection = (option: OptionType) => {
    setValue(option);
    setShowDropdown(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="block border border-gray-200 lg:flex">
      {!useSideLabel && (
        <span
          style={{ width: "233px" }}
          className={` inline-flex items-center pl-2 text-lg text-black font-bold lg:bg-[--brand-pastel-color] p-2 lg:border lg:border-gray-200 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600  `}
        >
          {label}
        </span>
      )}
      <div className="relative w-full" ref={dropdownRef}>
        <input
          type="text"
          value={value ? value.title : ""}
          onChange={handleInputChange}
          className={` text-gray-900 block flex-1 min-w-0 w-full text-sm lg:border border-0 h-full border-gray-200 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[--brand-white-color] dark:focus:ring-0 dark:focus:border-gray-100 bg-[--brand-white-color]`}
          placeholder={placeholder}
          disabled={disabled}
        />{" "}
        {showDropdown && (
          <ul className="absolute z-10 w-full mt-1 bg-[--brand-white-color] rounded shadow-lg">
            {filteredlist.map((option) => (
              <li
                key={option.title}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelection(option)}
              >
                {option.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
