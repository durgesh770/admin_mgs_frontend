"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// compnent
import Graph from "@/components/ui/Report/IncomeVSexpense/Graph";
import DynamicTable from "@/components/ui/Table";
import LongMenu from "@/components/ui/LongMenu/LongMenu";
import Tab from "@/components/ui/Tabs/Tab";
import PaginationFeature from "@/features/Appointments/PaginationFeature/PaginationFeature";
import IvsECards from "@/components/ui/Report/IncomeVSexpense/IvsECards";
// mui
import ReceiptIcon from "@mui/icons-material/Receipt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TableChartIcon from "@mui/icons-material/TableChart";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

//interface
import { TableRow } from "@/interface/Reports";
//hook
import { useGetExpenseRevenue } from "@/hooks/Accounts/Accounts";
import moment from "moment";
import { getExistingTab } from "@/utils/functions";


const IvsEfeatures = () => {
  // integration
  const { data, setPage } = useGetExpenseRevenue();

  console.log({
    data
  })

  // tab state
  const [activeTab, setActiveTab] = useState(getExistingTab());
  const router = useRouter();

  // three dot data
  const options = [
    {
      title: "Add Income",
      line: false,
      icon: <MonetizationOnIcon />,
      id: "view-income",
      url: true,
    },
    {
      title: "Add Expense",
      line: false,
      icon: <ReceiptIcon />,
      id: "view-notes",
      url: true,
    },
  ];

  // tab
  const tabs = [
    { label: "Table", icon: <TableChartIcon /> },
    { label: "Graph", icon: <AutoGraphIcon /> },
  ];

  // three dot click function
  const handleOptions = (option: any) => {
    if (option.title === "Add Income") {
      router.push("/accounts/revenue-report?tab=2&addIncome=true");
    } else if (option.title === "Add Expense") {
      router.push("/accounts/revenue-report?tab=3&addExpense=true");
    }
  };

  // fomate data to table
  let tableFormat: TableRow[] = data.results.map((item) => {
    const checkData = (item.totalRevenue ?? 0) - (item.totalExpense ?? 0) || 0;
    return {
      Date: {
        type: "custom",
        bold: false,
        value: moment(item.date).format("DD MMM YYYY"),
      },
      "Income Amount": {
        type: "custom",
        bold: false,
        value: item.totalRevenue ? (
          <span>{`$${item.totalRevenue}`} </span>
        ) : (
          "-"
        ),
      },
      "Expense Amount": {
        type: "custom",
        bold: false,
        value: item.totalExpense ? (
          <span>{`$${item.totalExpense}`} </span>
        ) : (
          "-"
        ),
      },
      Amount: {
        type: "custom",
        bold: false,
        value:
          checkData < 0 ? (
            <span className="font-bold text-red-600 ">
              {`-$${Math.abs(checkData)}`}
            </span>
          ) : (
            <span className="font-bold text-green-500 ">{`+$${checkData}`}</span>
          ),
      },
    };
  });

  return (
    <>
      <div className="bg-[--brand-white-color] border border-[--brand-light-gray-color] m-auto p-4 lg:w-[50vw] min-h-screen">
        <div className="flex flex-row items-center justify-between gap-3 pt-4">
          <div></div>
          <div>
            <h1 className="mb-0 font-bold  md:text-[2rem] text-[1.5rem] ">
              Income vs Expense Report
            </h1>
          </div>
          {/* three dot */}
          <div className="md:mr-7">
            <LongMenu options={options} handleOptions={handleOptions} />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mt-3 ">
          {/* cards */}
          <IvsECards />

        </div>
        {/* tab component */}
        <div className="py-4 ">
          <Tab value={activeTab} setValue={setActiveTab} tabs={tabs} />
        </div>

        {/* table */}
        {activeTab == 0 && (
          <div className="pb-6 m-auto ">
            <DynamicTable columns={columns} data={tableFormat} />
            <PaginationFeature setPage={setPage} totalPage={data.totalPages} />
          </div>
        )}

        {/* graph */}
        {activeTab == 1 && <Graph />}
      </div>
    </>
  );
};

const columns = [
  "Date",
  "Income Amount",
  "Expense Amount",
  "Profit/Loss Amount",
  // "Profit/Loss Status",
];

export default IvsEfeatures;
