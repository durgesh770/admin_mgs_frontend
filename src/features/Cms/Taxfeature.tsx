import Tax from "@/components/ui/CmsUI/Tax";
import { useSnackbar } from "@/context/GlobalContext";
import { useManageCMS } from "@/hooks/CMS";
import { CMSProps } from "@/interface/CMS";
import React, { useEffect, useState } from "react";

const Taxfeature = ({ data }: CMSProps) => {
  const alert = useSnackbar();
  const { handleCreate, loading } = useManageCMS();
  const [tax, setTax] = useState<number>(0);
  const [isDisable, setDisable] = useState(true);

  useEffect(() => {
    setTax(data.tax);
  }, [data]);

  const handleSubmit = () => {
    const newTax = {
      tax: parseInt(String(tax)),
    };

    if (isNaN(newTax.tax)) {
      alert.SnackbarHandler(true, "error", "Tax required");
    } else {
      handleCreate(newTax);
    }
  };

  return (
    <Tax
      setTax={setTax}
      tax={tax}
      handleSubmit={handleSubmit}
      isDisable={isDisable}
      loading={loading}
      setDisable={setDisable}
    />
  );
};

export default Taxfeature;
