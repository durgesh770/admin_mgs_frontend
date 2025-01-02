import React, { useEffect, useState } from "react";
import TextEditor from "@/components/common/TextEditor/TextEditor";
import Button from "@/components/ui/Button";
import { useSnackbar } from "@/context/GlobalContext";
import { useManageCMS } from "@/hooks/CMS";
import { CMSProps } from "@/interface/CMS";

const Bannerfeature = ({ data }: CMSProps) => {
  const { handleCreate, loading } = useManageCMS();
  const alert = useSnackbar();
  const [OfferBanner, setOfferBanner] = useState("");

  useEffect(() => {
    setOfferBanner(data.offer_banner);
  }, [data]);

  const handleUpdate = () => {
    if (!OfferBanner.trim()) {
      alert.SnackbarHandler(true, "error", "Offer Banner Required");
    } else {
      handleCreate({ offer_banner: OfferBanner });
    }
  };

  return (<>
      <div className="py-2">
        <TextEditor
          defaultValue={data.offer_banner}
          value={OfferBanner}
          onChange={(newValue) => setOfferBanner(newValue)}
          placeholder={"Write here..."}
          Fixedheight={100}
          maxWords={30}
          url=""
        />
      </div>

      <div className="pt-16  w-fit">
        <Button onClick={handleUpdate} btnType={"primary"} loading={loading}>
          Update Banner
        </Button>
      </div>
    </>
  );
};

export default Bannerfeature;
