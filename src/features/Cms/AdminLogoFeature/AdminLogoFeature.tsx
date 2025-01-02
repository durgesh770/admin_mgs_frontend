import Button from "@/components/ui/Button";
import { useManageCMS } from "@/hooks/CMS";
import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Colors from "@/components/ui/CmsUI/Colors";
import { useSnackbar } from "@/context/GlobalContext";
import { useAuth } from "@/context/AuthContext";

const AdminLogoFeature = () => {
  // integration
  const alert = useSnackbar();
  const { handleCreate } = useManageCMS();
  const { CMSData } = useAuth();

  // state
  const [admin, setAdmin] = useState(CMSData.admin.text);

  const [colors, setColors] = useState({
    secondary: "#00FF00",
    tertiary: "#0000FF",
  });

  useEffect(() => {
    setColors({
      secondary: CMSData.admin.secondary,
      tertiary: CMSData.admin.tertiary,
    });
  }, [CMSData]);

  const handleSubmit = () => {
    if (!admin.trim()) {
      alert.SnackbarHandler(true, "error", "Admin Lebal Required");
    } else {
      handleCreate({
        admin: {
          text: admin,
          secondary: colors.secondary,
          tertiary: colors.tertiary,
        },
      });
    }
  };

  return (
    <>
      <div className="mt-6 bg-[--brand-pastel-color]  border border-[--brand-light-gray-color] rounded-lg shadow-md md:p-5 lg:w-[40vw] m-auto md:px-6     ">
        <h1 className="font-bold  md:text-[20px] text-[10px] mb-3 text-[--brand-color] uppercase ">
          Admin Label Header
        </h1>
        <Input
          label="Label"
          value={admin}
          placeholder="label"
          borderline={true}
          onChange={(e) => setAdmin(e.target.value)}
        />
        <h1 className="font-bold  md:text-[20px] text-[10px] mb-3 text-[--brand-color] mt-7 uppercase">
          Admin Label Color
        </h1>

        <div className="flex flex-row items-center gap-4">
          {Object.entries(colors).map(([key, color]) => (
            <Colors
              key={key}
              setColors={(newColor: any) =>
                setColors((prevColors) => ({ ...prevColors, [key]: newColor }))
              }
              color={color}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </div>

        <div className="w-fit mt-7 pb-2 ">
          <Button onClick={handleSubmit} loading={false} btnType={"primary"}>
            Update Heading
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminLogoFeature;
