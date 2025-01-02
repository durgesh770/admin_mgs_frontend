// react
import Image from "next/image";
import React, { useState } from "react";
// mui
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
//conponent
import Button from "@/components/ui/Button";
import { DragDrop } from "@/components/common/Drag&Drop/DragDrop";
import AdminLogoFeature from "./AdminLogoFeature/AdminLogoFeature";
//hooks
import { useManageCMS } from "@/hooks/CMS";
import { useAuth } from "@/context/AuthContext";

const Logofeature = () => {
  const { handleCreate, loading } = useManageCMS();
  const { CMSData } = useAuth();
  const [logo, setLogo] = useState(CMSData.logo);
  const [file, setFile] = useState<File | null>(null);
  const [isDisable, setDisable] = useState(true);

  const handleFileChange = (selectedFile: File) => {
    // Handle file change logic here
    setFile(selectedFile);

    // Assuming you want to display the image directly from the uploaded file
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLogo(reader.result.replace("data:image/jpeg;base64,", ""));
      }
    };
    reader.readAsDataURL(selectedFile);
    setDisable(false);
  };

  return (
    <>
      <div className="mt-9 bg-[--brand-pastel-color]  border border-[--brand-light-gray-color] rounded-lg shadow-md md:p-5 lg:w-[40vw] m-auto  ">
        <h1 className="font-bold  md:text-[20px] text-[10px m text-[--brand-color] ml-3">
          LOGO
        </h1>

        <div className="flex md:flex-row flex-col gap-6 items-center justify-between p-3 ">
          <DragDrop
            handleFileChange={handleFileChange}
            file={file}
            setFile={setFile}
          />
          <div className=" bg-white  border border-[--brand-light-gray-color] rounded-lg shadow-md p-5 min-h-[150px] overflow-y-auto hiddenScrollbar relative  ">
            <div
              onClick={() => setLogo(null)}
              className="absolute top-0 right-0 cursor-pointer "
            >
              <CancelOutlinedIcon />
            </div>
            <div className=" flex justify-center items-center ">
              {logo && <Image src={`data:image/jpeg;base64,${logo}`} width={180} height={150} alt="logo" />}
            </div>
          </div>
        </div>
        <div className="w-fit ml-6 mt-2 pb-2 ">
          <Button
            onClick={() => handleCreate({ logo })}
            loading={loading}
            btnType={`${isDisable ? "disabled" : "primary"}`}
            className="p-5"
            isDisable={isDisable}
          >
            Update Logo
          </Button>
        </div>
      </div>
      <AdminLogoFeature />
    </>
  );
};

export default Logofeature;
