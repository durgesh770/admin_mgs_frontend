"use client";
import Link from "next/link";
// component
import SearchButtonHeader from "@/components/ui/Header/SearchButtonHeader";
import DynamicTable from "@/components/ui/Table";
import { getCustomers } from "@/hooks/Customer";

//permissions
import { PermissionAccess } from "@/middleware/PermissionAccess";
import CreateCustomers from "../CreateCustomers/CreateCustomers";
import PaginationFeature from "@/features/Appointments/PaginationFeature/PaginationFeature";
import { addQueryToUrl, getQueryFromUrl } from "@/utils/tools";
import Button from "@/components/ui/Button";
import { useState } from "react";
import moment from "moment";

// TableRow interface definition
interface TableRow {
  [key: string]: string | TableCell;
}

// TableCell interface definition
interface TableCell {
  type: "string" | "custom";
  bold?: boolean;
  value: string | JSX.Element;
}

const CustomerTable = () => {
  const [open, setOpen] = useState(false);
  //integration
  const customers = getCustomers({ defaultParams: getQueryFromUrl() });

  // Adjusted tableFormat
  let tableFormat: TableRow[] = customers.data.map((item) => ({
    Name: {
      type: "custom",
      bold: false,
      value: (
        <Link href={`?customerId=${item._id}`}>
          <span className="text-blue-600 cursor-pointer">{item.name}</span>
        </Link>
      ),
    },
    Email: item.email || "",
    Phone: item.telephone || "",
    LastVisited: {
      type: "custom",
      bold: false,
      value: item.appointment && moment(item.appointment).format("DD MMM YYYY").toString(),
    },
  }));

  const handleSearch = (value: any) => {
    customers.setparams((old: object) => {
      let query = { ...old, name: value };
      addQueryToUrl(query);
      return query;
    });
  };

  return (
    <>
      <div className="bg-[--brand-white-color] border border-[--brand-light-gray-color] m-auto  p-[18px] lg:w-[55vw] min-h-screen">
        <div className="flex justify-center my-3">
          <h1 className="mb-0 font-bold  md:text-[1.8rem] text-[1.5rem] ">
            All Customers
          </h1>
        </div>

        {/* SeachButtonHeader component */}
        <SearchButtonHeader
          placeholder={"Search"}
          btnName={
            <PermissionAccess requiredPermissions={["create_customer"]}>
              <Button
                btnType="secondary"
                loading={false}
                onClick={() => setOpen(true)}
              >
                Create Customer
              </Button>
            </PermissionAccess>
          }
          search={customers.params.name}
          setSearch={handleSearch}
        />

        <PermissionAccess requiredPermissions={["view_customers"]}>
          {/* table component */}
          {!customers.loading && (
            <DynamicTable columns={columns} data={tableFormat} />
          )}

          {/* pagination */}
          <PaginationFeature
            totalPage={customers.res.totalPages}
            setPage={customers.setPage}
          />
        </PermissionAccess>
        <CreateCustomers open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

const columns = ["Name", "Email", "Phone", "Last Visited"];

export default CustomerTable;
