"use client";
// mui imports
import { Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// react imports
import { useRouter } from "next/navigation";

interface headerProps {
  title: string;
  path?: any;
  rightSide?: React.ReactNode;
}

const Header = ({ title, path, rightSide }: headerProps) => {
  const route = useRouter();
  // handle arrow
  const handleArrow = () => {
    route.push(`/${path}`);
  };

  return (
    <>
      <header className="bg-[--brand-white-color] text-black pb-3 pt-4">
        <div className="container mx-auto flex justify-between">
          <div>
            <span
              onClick={handleArrow}
              className="cursor-pointer text-custom-blue"
            >
              <ArrowBackIcon />
            </span>
          </div>

          <div>
            <span className=" lg:text-2xl text-xl font-semibold">{title}</span>
          </div>

          <div>
            <Grid
              sx={{
                "@media (max-width: 640px)": {
                  margin: "auto",
                  backgroundColor: "white",
                  left: `0px`,
                  position: "fixed",
                  bottom: 0,
                  padding: "10px",
                  zIndex: 10,
                  width: "100%",
                },
              }}
            >
              {rightSide}
            </Grid>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
