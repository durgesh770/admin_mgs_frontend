"use client";
import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationUIProps {
  page: number;
  totalPage: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationUI: React.FC<PaginationUIProps> = ({
  page,
  totalPage,
  handleChange,
}) => {
  return (
    <div className="flex justify-center items-center  py-3">
      <Stack spacing={2}>
        <Pagination
          page={page}
          onChange={handleChange}
          hidePrevButton
          hideNextButton
          count={totalPage} // You can adjust the count as needed
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              backgroundColor: "white",
              color: "#43484E",
              "&:hover": { backgroundColor: "#43484E", color: "white" },
            },
            ".mui-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
              { backgroundColor: "#43484E", color: "white" },
             " .mui-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected:hover": {
              backgroundColor: "#43484E", color: "white"
            },
          }}
          className="custom-pagination"
        />
      </Stack>
    </div>
  );
};

export default PaginationUI;
