// mui
import { Grid } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MUIcon from "@/components/common/Icon";

// interface
interface Permission {
  icon: string;
  iconColor?: string;
  title: string;
  desc: string;
  roles: Role[];
  id: string;
  active: boolean;
}

interface Role {
  title: string;
  role: string;
  _id: string;
  selected: boolean;
}

interface PermissionSidebarProps {
  permissions: Permission[];
  selectedItem: Permission | null;
  handleItemClick: (id: string) => void;
}

const PermissionSidebar: React.FC<PermissionSidebarProps> = ({
  permissions,
  selectedItem,
  handleItemClick,
}) => (
  <Grid
    sx={{
      width: "40%",
      "@media (max-width: 800px)": {
        width: "100%",
      },
    }}
  >
    {permissions.map((item) => (
      <Grid
        onClick={() => handleItemClick(item.id)}
        className={`StaffMemberCss p-2 ${
          selectedItem?.id === item.id ? "bg-blue-200" : ""
        }`}
        sx={{ marginTop: "1px", cursor: "pointer", borderRadius: "3px" }}
        key={item.id}
      >
        <Grid className="StaffMemberCss">
          <MUIcon iconName={item.icon} style={{ color: item.iconColor }} />
          <span className="ml-2">{item.title}</span>
        </Grid>
        <Grid className="StaffMemberCss">
          <ChevronRightIcon
            sx={{
              display: "none",
              "@media (max-width: 800px)": {
                display: "block",
              },
            }}
          />
        </Grid>
      </Grid>
    ))}
  </Grid>
);

export default PermissionSidebar;
