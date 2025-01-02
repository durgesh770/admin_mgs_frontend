// component
import CreatePermissionCard from "@/components/ui/permission/CreatePermissionCard";
import SideDrawer from "@/components/ui/SideDrawer";

// mui
import { Grid } from "@mui/material";

// interface
interface Permission {
  icon: string;
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

interface PermissionCardProps {
  selectedItem: Permission | null;
  handleSetPermissionActive: (id: string) => void;
  handleSelectRole: (id: string, role: string) => void;
  isCardVisible: boolean;
  isDrawerOpen: boolean;
  handleDrawerClose: any;
}

const PermissionCard: React.FC<PermissionCardProps> = ({
  selectedItem,
  handleSetPermissionActive,
  handleSelectRole,
  isCardVisible,
  isDrawerOpen,
  handleDrawerClose,
}) => (
  <Grid
    sx={{
      width: "60%",
      "@media (max-width: 800px)": {
        width: "100%",
      },
    }}
  >
    {selectedItem && (isCardVisible || isDrawerOpen) && (
      <Grid className="Permissioncard">
        {/* create permission  */}
        <CreatePermissionCard
          permissionId={selectedItem.id}
          title={selectedItem.title}
          desc={selectedItem.desc}
          roles={selectedItem.roles}
          active={selectedItem.active}
          setActive={() => handleSetPermissionActive(selectedItem.id)}
          handleSelectRole={(role) => handleSelectRole(selectedItem.id, role)}
        />
      </Grid>
    )}

    {selectedItem && isDrawerOpen && (
      <Grid className="PermissionDrawer ">
        <SideDrawer
          open={isDrawerOpen}
          title={selectedItem.title}
          onClose={handleDrawerClose}
          headerHidden={true}
        >
          <div className="p-3">
            {/* create permission  */}
            <CreatePermissionCard
              permissionId={selectedItem.id}
              title={selectedItem.title}
              desc={selectedItem.desc}
              roles={selectedItem.roles}
              active={selectedItem.active}
              setActive={() => handleSetPermissionActive(selectedItem.id)}
              handleSelectRole={(role) =>
                handleSelectRole(selectedItem.id, role)
              }
            />
          </div>
        </SideDrawer>
      </Grid>
    )}
  </Grid>
);

export default PermissionCard;
