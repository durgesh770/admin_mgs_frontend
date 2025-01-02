"use client";

import React, { useState } from "react";

interface TableCell {
  type: "string" | "custom";
  bold?: boolean;
  value: string | any;
}

interface TableRow {
  [key: string]: string | TableCell;
}

interface TableProps {
  data: TableRow[];
  columns: string[];
  defaultRowSelected?: number[];
  onRowSelect?: (selectedRows: number[]) => void;
  checkbox?: boolean;
}

const DynamicTable: React.FC<TableProps> = ({
  data,
  columns,
  defaultRowSelected = [],
  onRowSelect,
  checkbox,
}) => {
  const [selectedRows, setSelectedRows] =
    useState<number[]>(defaultRowSelected);
  const toggleRowSelection = (rowIndex: number) => {
    const updatedSelectedRows = selectedRows.includes(rowIndex)
      ? selectedRows.filter((index) => index !== rowIndex)
      : [...selectedRows, rowIndex];

    setSelectedRows(updatedSelectedRows);
    onRowSelect && onRowSelect(updatedSelectedRows);
  };

  const handleCheckAll = () => {
    const updatedSelectedRows =
      data.length !== selectedRows.length ? data.map((_, index) => index) : [];

    setSelectedRows(updatedSelectedRows);
    onRowSelect && onRowSelect(updatedSelectedRows);
  };

  return (
    <div className="relative overflow-x-auto shadow-md  ">
      <table className="w-full text-sm text-left bg-[--brand-white-color]  border border-[--brand-light-gray-color] ">
        <thead className="text-xs uppercase bg-[--brand-pastel-color] text-[--brand-color] border border-[--brand-light-gray-color] ">
          <tr>
            {checkbox && (
              <th scope="col" className="p-4">
                <div className="flex justify-between ">
                  <div>
                    <input
                      id="checkbox-all"
                      type="checkbox"
                      onClick={handleCheckAll}
                      checked={selectedRows.length === data.length}
                      className=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              </th>
            )}

            {checkbox && (
              <th scope="col" className="p-4">
                <label htmlFor="checkbox-all" className=" text-black ">
                  {" "}
                  Select All
                </label>
              </th>
            )}

            {columns.map((column, index) => (
              <th key={index} scope="col" className="px-3 py-3 ">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={` border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover-bg-gray-600 
              ${selectedRows.includes(rowIndex) ? "bg-[#ededed]" : ""} `}
            >
              {checkbox && (
                <td className="w-4 p-4">
                  <div className="flex it ">
                    <input
                      id={`checkbox-table-${rowIndex}`}
                      type="checkbox"
                      className="  w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={selectedRows.includes(rowIndex)}
                      onChange={() => toggleRowSelection(rowIndex)}
                    />
                    <label
                      htmlFor={`checkbox-table-${rowIndex}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
              )}

              {Object.entries(row).map(([key, cell], cellIndex) => {
                const isObject = typeof cell == "object";
                const bold =
                  isObject && cell.bold ? "font-bold" : "font-medium";
                return (
                  <>
                    <td
                      key={cellIndex}
                      className={`px-3 py-3 ${bold} text-gray-900 whitespace-nowrap dark:text-[--brand-white-color] `}
                    >
                      {isObject ? cell.value : cell}
                    </td>
                  </>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
