import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningModal from "../../Modal/Warning";
import { useDeleteRevenue, useGetOtherRevenue } from "@/hooks/Accounts/Revenue";
import PaginationFeature from "@/features/Appointments/PaginationFeature/PaginationFeature";
import ReportTable from "./ReportTable";

const OtherRevenue = ({
  setDrawerOpen,
  setForm,
  setDateFilter,
  currentTab,
  setCurrentTab,
}: any) => {
  const { revenue, setPage } = useGetOtherRevenue();
  const [modalOpen, setModalOpen] = useState(false);
  const { handleDelete } = useDeleteRevenue();

  const options = [
    { id: 1, title: "Edit", icon: <EditIcon /> },
    { id: 2, title: "Delete", icon: <DeleteIcon /> },
  ];

  const handleOptions = (option: any, item: any, entries: any) => {
    if (option.id == 1) {
      setForm({
        date: item.date,
        entryData: {
          type: "other",
          description: entries.description,
          ref: entries.ref,
          amount: entries.amount.toString(),
        },
      });
      setDateFilter(item.date);
      setDrawerOpen(true);
      setCurrentTab({
        Id: option.id,
        item: item,
        entries: entries,
        title: "Edit Income",
      });
    } else if (option.id == 2) {
      setCurrentTab({
        Id: option.id,
        item: item,
        entries: entries,
      });
      setModalOpen(true);
    }
  };

  return (
    <>
      <div>
        <ReportTable
          isAction={true}
          rows={revenue.results}
          handleOptions={handleOptions}
          options={options}
        />
        <WarningModal
          open={modalOpen}
          updateOpen={() => setModalOpen(false)}
          title="Are you sure you want to delete this?"
          handleLeftbtn={() =>
            handleDelete(currentTab.item._id, currentTab.entries._id)
          }
          handleRightbtn={() => setModalOpen(false)}
          btnfirst="Delete"
          btnSec="Cancel"
        />
        <PaginationFeature setPage={setPage} totalPage={revenue.totalPages} />
      </div>
    </>
  );
};

export default OtherRevenue;
