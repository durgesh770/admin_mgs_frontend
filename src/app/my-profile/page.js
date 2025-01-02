"use client";
// react
import React, { useState } from "react";

// component
import MyPayroll from "@/features/MyProfile/MyPayroll";
import MyProfile from "@/features/MyProfile/MyProfile";
import Tab from "@/components/ui/Tabs/Tab";
import PageTitle from "@/components/ui/PageTitle";

// mui
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const page = () => {
  // tab state
  const [activeTab, setActiveTab] = useState(0);
  // tab
  const tabs = [
    {
      label: "My Profile", icon: <AccountCircleIcon />
    },
    { label: "My Payroll", icon: <AccountBalanceIcon /> },
  ];


  return (
    <>
      <div className="bg-[--brand-white-color] border border-[--brand-light-gray-color] m-auto  md:p-2  lg:w-[50vw] min-h-screen">

        <div className="max-w-4xl m-auto ">
          <div className=" flex flex-row justify-center items-center pt-4 ">
            <PageTitle title="My Profile" />
          </div>
          <div className="py-4 ">
            <Tab value={activeTab} setValue={setActiveTab} tabs={tabs} />
          </div>

          {/* table */}
          {activeTab == 0 && (
            <div className="  m-auto pb-6 ">
              <MyProfile />
            </div>
          )}

          {/* graph */}
          {activeTab == 1 && <MyPayroll />}
        </div>
      </div>
    </>
  );
};

export default page;
