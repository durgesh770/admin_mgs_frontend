"use client";
import { useEffect, useState } from "react";
import { CMSServices } from "@/services/CMS";
import { useSnackbar } from "@/context/GlobalContext";
import { CMSData } from "@/interface/CMS";

export const useGetCMS = () => {
  const [data, setdata] = useState<CMSData>({
    logo: "",
    tax: 0,
    colors: {
      white: "",
      grey: "",
      pastel: "",
      black: "",
      brand: "",
    },
    offer_banner: "",
    policy: {
      termsAndConditions: "",
      privacyPolicy: "",
      bookingPolicy: "",
      refundsAndCancellationPolicy: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    CMSServices.getCMS()
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { data, refetch, loading };
};

export const useManageCMS = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleCreate = (body = {}) => {
    setLoading(true);
    CMSServices.manageCMS(body)
      .then((res) => {
        setLoading(false);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Data Updated Successfully"
        );
        window.location.reload();
      })
      .catch((err) => {
        snackbar.SnackbarHandler(true, "error", err.response.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleCreate, loading };
};

export const useDeleteCMS = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const handleDelete = () => {
    setLoading(false);
    CMSServices.deleteCMS()
      .then((res) => {
        setLoading(true);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Data Delete Successfully"
        );
        window.location.reload();
      })
      .catch((err) => {
        snackbar.SnackbarHandler(true, "error", err.response.data.data);
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleDelete, loading };
};
