// react
import React, { useState } from "react";
// component
import StartEndDatePicker from "@/components/ui/StartEndDatePicker/StartEndDatePicker";
import Button from "@/components/ui/Button";
import DropDownSelect from "@/components/ui/DropDownSelect";

interface HeaderTitleProps {
  title: string;
}

// title component
const HeaderTitle: React.FC<HeaderTitleProps> = ({ title }) => {
  return <div className="font-bold text-black  md:mb-0 ">{title}</div>;
};

// interface
interface ReportHeaderProps {
  title: string;
  setDateRange: any;
  dateRange: { from: Date | null; to: Date | null };
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  HandleResetFilter: any;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  title,
  setDateRange,
  dateRange,
  setFilter,
  filter,
  HandleResetFilter,
}) => {
  // filter state
  const [chooseOptions, setChooseOption] = useState("");

  const handleDangeRangeChange = (type: "from" | "to", date: Date | null) => {
    setDateRange({ ...dateRange, [type]: date });
    setFilter("");
  };

  const options = {
    placeHolder: "Select",
    data: [
      { id: "Monthly", title: "Monthly" },
      { id: "Biyearly", title: "Biyearly" },
      { id: "Yearly", title: "Yearly" },
    ],
  };

  const dropdownData = {
    placeHolder: "Filter",
    data: [
      { id: "fixed", title: "Fixed " },
      { id: "range", title: "Range" },
    ],
  };

  const handleSelectChange = (selectedValue: any) => {
    if (selectedValue !== "none") {
      setFilter(selectedValue);
      setDateRange({
        from: null,
        to: null,
      });
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4">
      <HeaderTitle title={title} />

      <div className="cursor-pointer flex flex-wrap justify-center items-center gap-5 mt-2">
        <div>
          <DropDownSelect
            data={dropdownData}
            value={chooseOptions}
            setData={(selectedValue: any) => setChooseOption(selectedValue)}
          />
        </div>

        {chooseOptions == "range" && (
          <div className="cursor-pointer">
            <StartEndDatePicker
              startDate={dateRange.from}
              endDate={dateRange.to}
              setStartDate={(value: Date | null) =>
                handleDangeRangeChange("from", value)
              }
              setEndDate={(value: Date | null) =>
                handleDangeRangeChange("to", value)
              }
            />
          </div>
        )}

        {chooseOptions == "fixed" && (
          <div className="cursor-pointer">
            <DropDownSelect
              data={options}
              value={filter}
              setData={handleSelectChange}
            />
          </div>
        )}
        <div>
          <Button
            onClick={HandleResetFilter}
            loading={false}
            btnType="secondary"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
