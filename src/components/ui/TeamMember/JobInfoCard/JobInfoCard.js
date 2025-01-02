// react
import Link from "next/link";

// component
import Button from "../../Button";
import React, { useState } from "react";
import EditJobCompensation from "@/features/TeamMembers/EditJobCompensation/EditJobCompensation";

const JobInfoCard = ({ user }) => {
  //manage modal
  const [editopen, setEditOpen] = useState(false);

  return (
    <>
      <div className="cardsCss">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-md text-[--brand-color]">
              Job and Compensation
            </h1>
          </div>
          <div>

            <button
              onClick={() => setEditOpen(true)}
              className="font-semibold text-blue-500"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div onClick={() => setEditOpen(true)} className=" cursor-pointer">
            <p className="mb-2 lebleCss ">PRIMARY JOB</p>
            <span className="px-3 py-2 text-sm text-center bg-gray-200 w-30 rounded-xl">
              {user?.jobRole?.title || "NONE"}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-gray-600">
            Add wages to track pay, commission, view sales vs labor reports, and
            calculate overtime cost
          </p>
        </div>

        {!user?.wages && (
          <div className="mt-4 pb-1 ">
            <Button loading={false} btnType="secondary">
              Assign Wage to {user?.name}
            </Button>
          </div>
        )}

        {user?.wages && (
          <div className="mt-4">
            <Button loading={false} btnType="secondary" className="w-fit"
              onClick={() => setEditOpen(true)}>    {user?.wages || 0}$ per hour</Button>
          </div>
        )}

        <div className="pt-4 text-blue-500">
          <Link href={"team-members/manage-payroll"} className="underline">
            {" "}
            Manage Payroll
          </Link>
        </div>
      </div>

      <EditJobCompensation
        open={editopen}
        setOpen={setEditOpen}
        title={user?.jobRole?.title}
        user={user}
      />
    </>
  );
};

export default JobInfoCard;
