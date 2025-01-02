import { useState } from "react";
import { CouponService } from "@/services"; // Import your service file

//interface
import { useSnackbar } from "@/context/GlobalContext";

import { removeEmptyValues } from "@/utils/tools";


export const getCouponDiscountPrice = () => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (body = {}) => {
    setLoading(true);

    let res = await CouponService.getDiscountPrice(removeEmptyValues(body))
      .catch((err) => {
        alert.SnackbarHandler(
          true,
          "error",
          err.response?.data?.message || "An error occurred"
        );
      })
      .finally(() => {
        setLoading(false);
      });

    if (!res?.success) return;

    return res.data;
  };

  return { submit, loading };
};
