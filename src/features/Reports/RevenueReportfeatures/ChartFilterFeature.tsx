// react
import React, { useEffect, useState } from "react";
// utils
import { formatDateForFilter, getLastDate } from "@/utils/tools";
// moment
import moment from "moment";
// componnent
import ChartFilterUI from "@/components/ui/Report/RevenueReport/ChartFilterUI";

const ChartFilterFeature = ({ setParams , setFilter, filter}: any) => {
  // filter logic
  const [chooseOptions, setChooseOption] = useState("fixed");

  //---------------- Date Range (start) ---------------
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });

  useEffect(() => {
    if (dateRange.from == null && dateRange.to == null && filter != "none") {
      setParams({
        from: getLastDate(filter),
        to: moment().format("YYYY-MM-DD"),
      });
    } else {
      setParams({
        from: formatDateForFilter(dateRange.from),
        to: formatDateForFilter(dateRange.to),
      });
    }
  }, [dateRange, filter]);

  // handle reset filter button
  const handleResetFilter = () => {
    setFilter("none");
    setDateRange({
      from: null,
      to: null,
    });
  };

  return (
    <ChartFilterUI
      setDateRange={setDateRange}
      dateRange={dateRange}
      setFilter={setFilter}
      filter={filter}
      HandleResetFilter={handleResetFilter}
      setChooseOption={setChooseOption}
      chooseOptions={chooseOptions}
    />
  );
};

export default ChartFilterFeature;
