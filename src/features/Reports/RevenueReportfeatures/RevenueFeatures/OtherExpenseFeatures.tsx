// react
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// component
import Switch from "@/components/ui/Switch";
import OtherExpense from "@/components/ui/Report/RevenueReport/OtherExpense";
import ButtonCom from "@/components/ui/Button";
import { EditExpense } from "@/components/ui/Report/RevenueReport/EditExpense";
import ChartFilterFeature from "../ChartFilterFeature";
// hookd
import { useGetOtherExpenseChart } from "@/hooks/Accounts/Expense";
// utils
import {
  formateSalesChartData,
} from "@/utils/functions";
import SimpleAreaChart from "@/components/ui/SimpleAreaChart/SimpleAreaChart";

const OtherExpenseFeatures = ({ selectedTab }: any) => {
  // integration hooks
  const { chart, setParams } = useGetOtherExpenseChart();
  // use hooks
  const searchParams = useSearchParams();
  const newExpense = searchParams.get("addExpense");

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
    title: "Add Expense",
  });
  // filter state for chart
  const [filter, setFilter] = useState("Monthly");

  // open drawer with query
  useEffect(() => {
    if (newExpense) setDrawerOpen(true);
  }, [newExpense]);

  useEffect(() => {
    setForm((pre: any) => ({
      ...pre,
      date: dateFilter,
    }));
  }, [dateFilter]);

  // chart data
  const chartData =
    filter == "Monthly"
      ? formateSalesChartData(chart, "monthly", "Other Expense")
      : formateSalesChartData(chart, "other", "Other Expense");

  // handle Add expense button
  const handleAddExpense = () => {
    setDateFilter("");
    setCurrentTab((prev: any) => ({
      ...prev,
      title: "Add Expense",
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
          {/* switch  */}
          <div className="mx-5">
            <Switch onChange={() => setView(!view)} />
          </div>
          <h4 className="mulish">CHART VIEW</h4>
        </div>
        <div className="pr-4">
          {selectedTab == 3 && (
            <ButtonCom
              className="mt-4 md:mt-0"
              loading={false}
              btnType="secondary"
              onClick={() => handleAddExpense()}
            >
              Add Expense
            </ButtonCom>
          )}
        </div>
      </div>

      {/* table and chart */}
      {!view ? (
        <OtherExpense
          setDrawerOpen={setDrawerOpen}
          setForm={setForm}
          setDateFilter={setDateFilter}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      ) : (
        <div className="m-auto pb-6 bg-[--brand-white-color]">
          <ChartFilterFeature
            setParams={setParams}
            filter={filter}
            setFilter={setFilter}
          />

          <div className="mt-12" >
            <SimpleAreaChart data={chartData} type={"Other Expense"} />
          </div>
        </div>
      )}

      {/* drawer component  */}
      <EditExpense
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

export default OtherExpenseFeatures;
