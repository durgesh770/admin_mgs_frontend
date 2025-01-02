import { PermissionAccess } from "@/middleware/PermissionAccess";
import React, { useState } from "react";
import EditDetails from "./EditDetails";
import { getIntakeform, useDeleteCustomer } from "@/hooks/Customer";
import Chip from "../../Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningModal from "../../Modal/Warning";

interface PersonalDetailsProps {
  data: any;
  handleRelocate: any;
}

const PersonalDetails = ({ data, handleRelocate }: PersonalDetailsProps) => {
  const res = getIntakeform(data?.id) as any;
  const [modalOpen, setModalOpen] = useState(false);
  const { handleDeleteCustomer, isLoading } = useDeleteCustomer();

  return (
    <>
      <div className="cardsCss">
        <div className="flex items-start justify-between w-full">
          <div>
            <span className="text-lg font-extrabold text-[--brand-color]">
              Personal Details
            </span>
          </div>
          <div className="flex items-end justify-end">
    
          <PermissionAccess requiredPermissions={["delete_customers"]}>
          <div className="pr-6 cursor-pointer">
            <DeleteIcon onClick={() => setModalOpen(!modalOpen)} />
          </div>
          </PermissionAccess>
          <PermissionAccess requiredPermissions={["edit_customers"]}>
            <div>
              <button className="font-semibold text-blue-500">
                <EditDetails data={data} />
              </button>
            </div>
          </PermissionAccess>
          </div>
        </div>

        <div>
          <p className="lebleCss">NAME</p>
          <p className="text-sm font-medium text-blue-600">{data?.name}</p>
        </div>

        <div className="py-3">
          <p className="lebleCss">PHONE</p>
          <p className="text-sm text-blue-600">{data?.telephone}</p>
        </div>
        <div>
          <p className="lebleCss">EMAIL</p>
          <p className="text-sm text-blue-600">{data?.email}</p>
        </div>

        {!res.loading && (
          <div className="flex items-center justify-between py-2 text-blue-600 ">
            <div>
              <p className="text-sm lebleCss">Intake Form</p>
              {res.data?.length == 0 ? (
                <div>
                  <Chip
                    backgroundColor={"red"}
                    color={"White"}
                    label="Not Filed Form"
                  />
                </div>
              ) : (
                <p
                  className="text-sm text-blue-600 cursor-pointer"
                  onClick={handleRelocate}
                >
                  View
                </p>
              )}
            </div>
            {res.data?.edit_request_status == "change_request" && (
              <div>
                <Chip
                  backgroundColor={"red"}
                  color={"White"}
                  label={`Change Request`}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <WarningModal
        open={modalOpen}
        updateOpen={() => setModalOpen(false)}
        title="Are you sure you want to Delete the Customer"
        handleRightbtn={() => setModalOpen(false)}
        handleLeftbtn={() => handleDeleteCustomer(data?.id as string)}
        btnfirst="Delete"
        btnSec="Cancel"
        loading={!isLoading}
      />
    </>
  );
};

export default PersonalDetails;
