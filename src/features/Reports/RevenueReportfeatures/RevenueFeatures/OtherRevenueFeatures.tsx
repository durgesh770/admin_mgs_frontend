// react
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// component
import ButtonCom from "@/components/ui/Button";
import { EditIncome } from "@/components/ui/Report/RevenueReport/EditIncome";
import OtherRevenue from "@/components/ui/Report/RevenueReport/OtherRevenue";
import Switch from "@/components/ui/Switch";
import ChartFilterFeature from "../ChartFilterFeature";
// hooks
import { useGetOtherRevenueChart } from "@/hooks/Accounts/Revenue";
// utils
import {
  formateSalesChartData,
} from "@/utils/functions";
import SimpleAreaChart from "@/components/ui/SimpleAreaChart/SimpleAreaChart";

const OtherRevenueFeatures = ({ selectedTab }: any) => {
  // integration custom hooks
  const { chart, setParams } = useGetOtherRevenueChart();
  // hook for query
  const searchParams = useSearchParams();
  const newRevenue = searchParams.get("addIncome");

  // state
  const [view, setView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [form, setForm] = useState({
    date: dateFilter,
    entryData: {
      type: "other",
      description: "",
      ref: "",
      amount: "",
    },
  });
  const [currentTab, setCurrentTab] = useState<any>({
    Id: 0,
    item: {},
    entries: {},
    title: "Add Income",
  });
  // filter state for chart
  const [filter, setFilter] = useState("Monthly");

  // for open drawer
  useEffect(() => {
    if (newRevenue) setDrawerOpen(true);
  }, [newRevenue]);

  // chart data
  const chartData =
    filter == "Monthly"
      ? formateSalesChartData(chart, "monthly", "Other Revenue")
      : formateSalesChartData(chart, "other", "Other Revenue");

  const handleAddIncome = () => {
    setDateFilter("");
    setCurrentTab((prev: any) => ({
      ...prev,
      title: "Add Income",
    }));
    setForm({
      date: dateFilter,
      entryData: {
        type: "other",
        description: "",
        ref: "",
        amount: "",
      },
    });
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="md:flex md:flex-row justify-between items-center pb-4 block">
        <div className="flex items-center justify-start break-words container-sub md:px-0 text-[--brand-color] pl-1 my-3">
          <h4 className="mulish">TABULAR VIEW</h4>
          {/* switch */}
          <div className="mx-5">
            <Switch onChange={() => setView(!view)} />
          </div>
          <h4 className="mulish">CHART VIEW</h4>
        </div>
        <div className="pr-2">
          {selectedTab == 2 && (
            <ButtonCom
              className="mt-4 md:mt-0"
              loading={false}
              btnType="secondary"
              onClick={() => handleAddIncome()}
            >
              Add Income
            </ButtonCom>
          )}
        </div>
      </div>

      {/* table an chart */}
      {!view ? (
        <OtherRevenue
          setDrawerOpen={setDrawerOpen}
          setForm={setForm}
          setDateFilter={setDateFilter}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      ) : (
        <div className=" m-auto pb-6 bg-white">
          <ChartFilterFeature
            filter={filter}
            setFilter={setFilter}
            setParams={setParams}
          />
          <div className="mt-12" >
            <SimpleAreaChart data={chartData} type={"Other Revenue"} />
          </div>
        </div>
      )}

      {/* drawer  */}
      <EditIncome
        form={form}
        setForm={setForm}
        drawerOpenSecEdit={drawerOpen}
        setDrawerOpenSecEdit={setDrawerOpen}
        setDateFilter={setDateFilter}
        dateFilter={dateFilter}
        currentTab={currentTab}
      />
    </>
  );
};

export default OtherRevenueFeatures;
