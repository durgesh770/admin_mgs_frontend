import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface SideDrawerProps {
  open: boolean;
  onClose: any;
  children: any;
  title: string;
  headerHidden?: any;
  customWidth?: boolean;
}

const SideDrawer = ({
  open,
  onClose,
  title,
  children,
  headerHidden,
  customWidth,
}: SideDrawerProps) => {
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            "@media (max-width:600px)": { width: "100%" },
            "@media (min-width:601px) and (max-width:960px)": { width: "55%" },
            "@media (min-width:1200px)": {
              width: `${customWidth ? "45%" : "35%"}`,
            },
            "@media (max-width:1200px) and (min-width:961px)": { width: "40%" },
            backgroundColor: "var(--brand-pastel-color)",
          },
        }}
      >
        {headerHidden && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: "20px",
              paddingRight: "10px",
              paddingTop: "20px",
            }}
          >
            <div>
              <span className="text-xl font-bold text-[--brand-color] ">
                {title}
              </span>
            </div>
            <div>
              <IconButton onClick={onClose}>
                <CloseIcon />{" "}
              </IconButton>
            </div>
          </div>
        )}
        <div>{children}</div>
      </Drawer>
    </>
  );
};

export default SideDrawer;
