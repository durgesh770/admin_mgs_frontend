import React, { useState } from "react";

interface ListOptionType {
  id?: string;
  service: string;
  duration: number;
  price: number;
}

interface AddservicesProps {
  serviceslist: ListOptionType[];
  handlelistSelection: (item: ListOptionType, option: number) => void;
  showDropdown: boolean;
  value: ListOptionType | null;
  setValue: React.Dispatch<React.SetStateAction<ListOptionType | null>>;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Addservices: React.FC<AddservicesProps> = ({
  serviceslist,
  handlelistSelection,
  showDropdown,
  value,
  setValue,
  setShowDropdown,
}) => {
  const [filteredList, setFilteredList] =
    useState<ListOptionType[]>(serviceslist);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    const filtered = serviceslist.filter((item) =>
      item.service.toLowerCase().includes(inputValue)
    );
    setFilteredList(filtered);
    setValue((prevValue) => ({
      ...prevValue,
      service: inputValue,
      duration: prevValue?.duration || 0,
      price: prevValue?.price || 0,
    }));
    setShowDropdown(inputValue.length > 0);
  };

  return (
    <div className="relative w-full border border-gray-200">
      <div className="py-3 pl-4 cursor-pointer">
        <span
          onClick={() => {
            setFilteredList(serviceslist), setShowDropdown(!showDropdown);
          }}
          className="my-4 text-blue-500"
        >
          Add a Service
        </span>
      </div>

      {showDropdown && (
        <ul className="absolute w-full bg-white rounded shadow-md">
          <div className="relative px-4 py-2">
            <div className="absolute inset-y-0 flex items-center pl-8 pointer-events-none start-0 ps-3">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={value ? value.service : ""}
              onChange={handleInputChange}
              className="border pl-11 focus:outline-none focus:ring-0 text-gray-900 focus:border-gray-100 block flex-1 min-w-0 w-full text-sm border-gray-200 p-2.5"
              placeholder="Search..."
            />
          </div>
          <div className="h-[220px] overflow-y-auto">
            {filteredList.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handlelistSelection(item, index)}
              >
                {item.service}
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default Addservices;
