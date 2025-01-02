"use client";
// react
import React, { useState } from "react";

// mui
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaletteIcon from "@mui/icons-material/Palette";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import PolicyIcon from "@mui/icons-material/Policy";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";

// component
import Tab from "@/components/ui/Tabs/Tab";
import Policyfeature from "./Policyfeature";
import Bannerfeature from "./Bannerfeature";
import Colorsfeature from "./Colorsfeature";
import Taxfeature from "./Taxfeature";
import Logofeature from "./Logofeature";
import { getExistingTab } from "@/utils/functions";
import PageTitle from "@/components/ui/PageTitle";
import { useGetCMS } from "@/hooks/CMS";

export const CmsFeatures = () => {
  const { data } = useGetCMS();

  const [activeTab, setActiveTab] = useState(getExistingTab());

  const tabs = [
    { label: "Logo", icon: <BrandingWatermarkIcon /> },
    { label: "Tax", icon: <MonetizationOnIcon /> },
    { label: "Colors", icon: <PaletteIcon /> },
    { label: "Offer Banner", icon: <PermMediaIcon /> },
    { label: "Policy", icon: <PolicyIcon /> },
  ];

  return (
    <>
      <div className="bg-white border border-[--brand-light-gray-color] m-auto p-4 lg:w-[50vw] min-h-screen">
        <div className="pt-4 flex flex-row justify-center items-center mt-5 ">
          <PageTitle title="CMS (Content Management System)" />
        </div>
        <div className="mt-5 ">
          <Tab tabs={tabs} value={activeTab} setValue={setActiveTab} />

          {activeTab === 0 && <Logofeature />}
          {activeTab === 1 && <Taxfeature data={data} />}
          {activeTab === 2 && <Colorsfeature data={data} />}
          {activeTab === 3 && <Bannerfeature data={data} />}
          {activeTab === 4 && <Policyfeature data={data} />}
        </div>
      </div>
    </>
  );
};
