"use client";

// react
import { useState } from "react";
import Link from "next/link";

//services
import { getTeamMembers } from "@/hooks/TeamMembers";

//components
import DynamicTable from "@/components/ui/Table";
import WarningModal from "@/components/ui/Modal/Warning";
import { convertSchedule } from "@/utils/tools";
import Switch from "@/components/ui/Switch";
import { TeamMemberService } from "@/services";
import { EmptyTimetableExample } from "@/interface/TeamMembers";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PaginationFeature from "@/features/Appointments/PaginationFeature/PaginationFeature";

const TeamMembersTable = () => {
  //block
  const [warningModal, setwarningModal] = useState(false);
  const [warningTitle, setwarningTitle] = useState("");

  const getAvailability = (timetable) => {
    const tableFormat = convertSchedule(timetable);
    const table = Object.keys(tableFormat);
    const data = table.filter((key) => {
      const item = tableFormat[key];
      return item.length > 0;
    });
    return data.map((day) => day.substring(0, 2));
  };

  // data
  const members = getTeamMembers();
  const { data, loading } = members;

  // table formate
  let tableFormat = data.map((item) => {
    const handleSubmit = (onlineBooking) => {
      TeamMemberService.updateStaffHours(item.id, {
        onlineBooking: onlineBooking,
        timetable: item.staffHours?.timetable || EmptyTimetableExample,
      });
    };

    return {
      title: {
        bold: true,
        type: "custom",
        value: (
          <div>
            <Link href={`?memberId=${item.id}`}>
              <span className="text-blue-600 cursor-pointer">{item.name}</span>
            </Link>
            <FiberManualRecordIcon sx={{ color: `${item.color}`, fontSize: "14px", alignItems: "center" }} />
          </div>
        ),
      },
      phone: `${item.telephone || ""}`,
      role: `${item?.role?.title || ""}`,
      availability: `${getAvailability(item.staffHours.timetable) || ""}`,
      job: item?.jobRole?.title || "-",
      OnlineBookable: {
        type: "custom",
        value: (
          <Switch
            defaultChecked={item.staffHours.onlineBooking}
            onChange={(e) => handleSubmit(e.target.checked)}
          />
        ),
      },
      active: item.active ? "Active" : "Inactive",
    };
  })

  console.log(data)

  return (
    <>
      <DynamicTable columns={columns} data={tableFormat} loading={loading} />

      {/* pagination */}
      <PaginationFeature totalPage={members.res.totalPages} setPage={members.setPage} />

      <WarningModal
        title={warningTitle}
        open={warningModal}
        updateOpen={setwarningModal}
      />
    </>
  );
};

const columns = [
  "Name",
  "Phone",
  "Role",
  "Availibility",
  "Job Role",
  "Online Bookable",
  "Status",
];

export default TeamMembersTable;
