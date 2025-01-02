// mui
import React from "react";
// component
import StartEndDatePicker from "@/components/ui/StartEndDatePicker/StartEndDatePicker";
import Button from "@/components/ui/Button";
import DropDownSelect from "../../DropDownSelect";

// interface
interface ChartFilterUIProps {
  setDateRange: any;
  dateRange: { from: Date | null; to: Date | null };
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  HandleResetFilter: () => void;
  chooseOptions: string;
  setChooseOption: React.Dispatch<React.SetStateAction<string>>;
}

const ChartFilterUI: React.FC<ChartFilterUIProps> = ({
  setDateRange,
  dateRange,
  setFilter,
  filter,
  HandleResetFilter,
  chooseOptions,
  setChooseOption,
}) => {
  // handle change date
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
    placeHolder: "Select an option",
    data: [
      { id: "fixed", title: "Fixed " },
      { id: "range", title: "Range" },
    ],
  };

  // handle fixed filter drop down 
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
    <div className="cursor-pointer flex flex-wrap justify-between items-center gap-5 pt-5 px-4">
      {chooseOptions === "range" && (
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

      {chooseOptions === "fixed" && (
        <div className="cursor-pointer">
          <DropDownSelect
            data={options}
            value={filter}
            setData={handleSelectChange}
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-5">
        <div >
          <DropDownSelect
            data={dropdownData}
            value={chooseOptions}
            setData={setChooseOption}
          />
        </div>
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

export default ChartFilterUI;
