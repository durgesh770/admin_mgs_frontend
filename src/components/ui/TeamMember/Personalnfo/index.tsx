// component imports
import EditProfile from "@/features/TeamMembers/PersonalInfo/EditProfile";
import {
  updateMember,
  useDeleteTeamMember,
  useUpdateActiveStatus,
} from "@/hooks/TeamMembers";
import { useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningModal from "../../Modal/Warning";
// interface for props
interface PersonalInfoCardProps {
  data: {
    name: string;
    email: string;
    phone?: string;
    id?: string;
    teamMemberId?: string;
    color?: string;
    telephone?: string;
    active: boolean;
  };
  isEdit?: boolean;
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  data,
  isEdit,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const updateHook = updateMember(data?.id as string);
  const { handleDeleteTeamMember, isLoading } = useDeleteTeamMember();
  const { handleStatus } = useUpdateActiveStatus();

  let defaultValue = {
    name: data?.name,
    email: data?.email,
    telephone: data?.phone || data.telephone,
    teamMemberId: data?.teamMemberId,
    color: data?.color,
  };
  const [formData, setFormData] = useState(defaultValue);

  return (
    <div className="cardsCss">
      <div className="flex items-start justify-between w-full">
        <div>
          <span className="font-semibold text-md text-[--brand-color]">
            Personal Information
          </span>
        </div>

        <div className="flex items-end justify-end">
          <div className="pr-6">
            <DeleteIcon onClick={() => setModalOpen(!modalOpen)} />
          </div>
          <div>
            {!isEdit && (
              <button className="font-semibold text-blue-500">
                <EditProfile
                  data={formData}
                  setData={setFormData}
                  handleDelete={() =>
                    handleStatus(data?.id as string, data?.active)
                  }
                  handleSubmit={() => updateHook.submit(formData)}
                  loading={updateHook.loading}
                  active={data.active}
                />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <p className="lebleCss">NAME</p>
          <span className="text-sm">{data?.name}</span>
          <FiberManualRecordIcon
            sx={{
              color: `${data?.color}`,
              fontSize: "14px",
              alignItems: "center",
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mt-2">
        <div>
          <p className="lebleCss">EMAIL</p>
          <p className="text-sm">{data?.email}</p>
        </div>
        <div>
          <p className="lebleCss">PHONE</p>
          <p className="text-sm">
            {data?.phone || data.telephone || "Not Available"}
          </p>
        </div>
      </div>

      <WarningModal
        open={modalOpen}
        updateOpen={() => setModalOpen(false)}
        title="Are you sure you want to Delete the Team Member"
        handleRightbtn={() => setModalOpen(false)}
        handleLeftbtn={() => handleDeleteTeamMember(data?.id as string)}
        btnfirst="Delete"
        btnSec="Cancel"
        loading={!isLoading}
      />
    </div>
  );
};

export default PersonalInfoCard;
