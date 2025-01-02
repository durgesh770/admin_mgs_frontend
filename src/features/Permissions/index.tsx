"use client";
// next imports
import React, { useMemo } from "react";

// component imports
import Button from "@/components/ui/Button";
import DynamicTable from "@/components/ui/Table";

// mui imports
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

//Roles
import { getRoles } from "@/hooks/Role";
import { addQueryToUrl, getQueryFromUrl } from "@/utils/tools";
import PaginationFeature from "../Appointments/PaginationFeature/PaginationFeature";
import { PermissionAccess } from "@/middleware/PermissionAccess";

// table type
type TableFormatItem = {
  name: {
    bold: boolean;
    type: "custom";
    value: React.ReactNode;
  };
  access: string;
  teamMember: any;
};

const PermissionTable = () => {
  const route = useRouter();

  const roles = getRoles({ defaultParams: getQueryFromUrl() });

  // table formate data
  let tableFormat: TableFormatItem[] = useMemo(() => {
    return roles.data.map((item) => {
      return {
        name: {
          bold: false,
          type: "custom",
          value: (
            <Link href={`/permissions/edit-permission/${item._id}`}>
              <span className="text-blue-600 cursor-pointer">{item.title}</span>
            </Link>
          ),
        },
        access: item.fullAccess ? "Full Access" : "Custom",
        teamMember: item.totalMember,
      };
    });
  }, [roles]);

  // routing
  const handleLocate = () => {
    route.push("/permissions/create-permission");
  };

  const handleSearch = (value: any) => {
    roles.setparams((old: object) => {
      let query = { ...old, title: value };
      addQueryToUrl(query);
      return query;
    });
  };

  return (
    <>
      <div className="bg-[--brand-white-color] border border-[--brand-light-gray-color] m-auto  md:p-5 lg:w-[45vw]  min-h-screen">
        <div className="flex flex-row items-center justify-center mt-3">
          <h1 className="mb-0 font-bold  md:text-[1.7rem] text-[1.5rem]">
            Permissions
          </h1>
        </div>
        <Grid
          className="py-6 md:m-0 m-3 "
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            "@media (max-width: 800px)": {
              display: "block",
            },
          }}
        >
          <div className="relative ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <SearchIcon />
            </div>
            <input
              value={roles?.params?.title || ""}
              onChange={(e) => handleSearch(e.target.value)}
              type="search"
              id="default-search"
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Filter Permission sets"
              required
            />
          </div>

          {/* button component */}
          <Grid
            sx={{
              "@media (max-width: 800px)": {
                marginTop: "1rem",
              },
            }}
          >
            <PermissionAccess requiredPermissions={["create_permission"]}>
              <Button
                loading={false}
                onClick={handleLocate}
                btnType="secondary"
                className="text-custom-blue"
              >
                Create Role set
              </Button>
            </PermissionAccess>
          </Grid>
        </Grid>

        {/* table compenent */}
        <DynamicTable columns={columns} data={tableFormat} />

        {/* pagination */}
        <PaginationFeature
          totalPage={roles.res.totalPages}
          setPage={roles.setPage}
        />
      </div>
    </>
  );
};

// table columns
const columns = ["Name", "Access", "Team Member"];

export default PermissionTable;
