import Button from "@/components/ui/Button";
import Colors from "@/components/ui/CmsUI/Colors";
import { useManageCMS } from "@/hooks/CMS";
import { CMSProps } from "@/interface/CMS";
import React, { useEffect, useState } from "react";

const Colorsfeature = ({ data }: CMSProps) => {
  const { handleCreate, loading } = useManageCMS();
  const [colors, setColors] = useState({
    white: "#ffffff",
    grey: "#cccccc",
    pastel: "#f0f0f0",
    black: "#000000",
    brand: "#ff0000",
  });

  useEffect(() => {
    if (data.colors.white) {
      setColors(data.colors);
    }
  }, [data]);

  const handleSave = () => {
    ;
  };

  const handleReset = () => {
    handleCreate({
      colors: {
        white: null,
        grey: null,
        pastel: null,
        black: null,
        brand: null,
      },
    });
  };

  return (
    <div className="mt-12 bg-white border border-[--brand-light-gray-color] rounded-lg shadow-md p-5 lg:w-[40vw] m-auto">
      <div className="flex flex-wrap justify-between items-center gap-3">
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
      <div className="flex flex-row justify-start items-center gap-3 ">
        <div className="w-fit mt-8">
          <Button
            onClick={()=> handleCreate({ colors })}
            btnType="secondary"
            className="p-5"
            loading={false}
          >
            Save Changes
          </Button>
        </div>
        <div className="w-fit mt-8">
          <Button
            onClick={handleReset}
            btnType="secondary"
            className="p-5"
            loading={false}
          >
            Reset Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Colorsfeature;
