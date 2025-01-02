//react
import React from "react";
// component 
import DynamicTable from "@/components/ui/Table";
import { getServices } from "@/hooks/Services";

const ServicesProvided = ({ user }: any) => {
  // integration 
  const servicesData = getServices(100);
 //  data
  const filteredServices = servicesData.data.filter((service) =>
    user.services.includes(service.id)
  );
  const titlesOnly = filteredServices.map((item) => ({ title: item.title }));

  return (
    <>
      <div className="cardsCss">
        <div className="pb-4">
          <span className="font-semibold text-md text-[--brand-color]">
            Services
          </span>
        </div>
        <DynamicTable data={titlesOnly} columns={columns} checkbox={false} />
      </div>
    </>
  );
};
const columns = ["Title"];

export default ServicesProvided;
