// mui
import {
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
// components
import Switch from "../Switch";

// interface
interface CreatePermissionCardProps {
  permissionId: string;
  title: string;
  desc: string;
  roles: {
    title: string;
    role: string;
    selected: boolean;
  }[];

  active: any;
  setActive: any;
  handleSelectRole: (role: string) => any;
}

const CreatePermissionCard = ({
  permissionId,
  title,
  desc,
  roles,
  active,
  setActive,
  handleSelectRole,
}: CreatePermissionCardProps) => {
  return (
    <>
      <Card variant="outlined" className="p-4 ">
        <Grid className="StaffMemberCss">
          <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
            {title}
          </Typography>

          <div className="flex items-center">
            <label className="block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-[--brand-white-color] ">
              Full Access
            </label>
            <Switch
              switchValue={active}
              setSwitchValue={() => setActive(permissionId)}
            />
          </div>
        </Grid>
        <Typography>{desc}</Typography>

        {true ? (
          <>
            <Divider className="py-2" />
            <Grid className="my-4">
              <Typography>Permission</Typography>
              <Grid
                display={"grid"}
                gridTemplateColumns={"repeat(1, 1fr)"}
                paddingLeft={"5%"}
              >
                {roles.map((role) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={role.selected}
                          onChange={() => handleSelectRole(role.role)}
                        />
                      }
                      label={role.title}
                    />
                  );
                })}
              </Grid>
            </Grid>
          </>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};

export default CreatePermissionCard;
