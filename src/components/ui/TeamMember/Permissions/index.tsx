//mui imports
import EditRole from "@/features/TeamMembers/Permission/EditRole";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import ViewAccess from "@/features/TeamMembers/Permission/ViewAccess";

// interface for props
interface PermissionInfoCardProps {
  data: {
    permissionSet?: string;
    access: string;
    passcode: string;
    permissions: string;
  };
  role?: {
    title: string;
    roleId: string;
  };
  memberId: string;
  isEdit?:boolean;

}

const PermissionInfoCard: React.FC<PermissionInfoCardProps> = ({
  data,
  role,
  memberId,
  isEdit
}) => {
  return (
    <div className="cardsCss">
      <div className="flex items-center justify-between">
        <div>
          {" "}
          <h1 className="font-semibold text-md text-[--brand-color]">
            Permission
          </h1>
        </div>
        <div>
          {!isEdit && (
            <button className="font-semibold text-blue-500">
              <EditRole memberId={memberId} defaultRole={role} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-2 mb-2">
        <div className="pt-1.5">
          <p className="lebleCss">PERMISSION SET</p>
          <p className="text-sm">{data.permissionSet || role?.roleId}</p>
        </div>

        <div className="pt-1.5">
          <p className="lebleCss">PERMISSIONS</p>
          <div className="flex items-center cursor-pointer">
            <div className="bg-gray-600 text-white rounded-full text-xs p-1.5 mr-2">
              <HttpsOutlinedIcon className="text-xl" />
            </div>

            <ViewAccess roleId={role?.roleId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionInfoCard;
