"use client";
// next imports
import React from "react";

// component imports
import Button from "@/components/ui/Button";

// mui imports
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface SearchButtonHeaderProps {
  btnName: any;
  search?: string;
  setSearch: Dispatch<SetStateAction<string>>;
  placeholder: string;
}

const SearchButtonHeader = ({
  search,
  btnName,
  setSearch,
  placeholder,
}: SearchButtonHeaderProps) => {
  return (
    <>
      <Grid
        className="pb-7 pt-4"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          "@media (max-width: 800px)": {
            display: "block",
          },
        }}
      >
        <div className="relative ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            id="default-search"
            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-[--brand-white-color] dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder}
            required
          />
        </div>

        {/* button component */}
        {btnName && (
          <Grid
            sx={{
              "@media (max-width: 800px)": {
                marginTop: "1rem",
              },
            }}
          >
            {btnName}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default SearchButtonHeader;
