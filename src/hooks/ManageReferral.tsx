import { useSnackbar } from "@/context/GlobalContext";
import { Referral } from "@/services/Referral";
import { useEffect, useState } from "react";

export const useHandleOptionsReferral = ({
  setWarninigModalOpen, // Function to set the warning modal open state
  handleReject, // Function to handle rejection
  handleApprove, // Function to handle approval
  handleDelete, // Function to handle deletion
  refetch, // Function to refetch data
  setAddReferral, // Function to set the add referral state
}: any) => {
  // Store referral id
  const [referralId, setreferralId] = useState("");

  // Add and edit referral logic
  const [value, setValue] = useState<any>(""); // Value for referral
  const [inputData, setInputData] = useState({
    // Input data for referral
    discount: "",
    couponcode: "",
  });
  const [title, setTitle] = useState({
    heading: "Add Referral",
    disable: false,
  }); // Title for referral
  const [current, setCurrent] = useState(-1); // Current tab index
  const [warning, setWarning] = useState({
    // Warning modal content
    id: 0,
    btnFirstName: "Approve",
    btnSecName: "Reject",
    title: "You Want to Approve or Reject the Referral?",
  });

  // Handler for rejection button
  const handleRejectbtn = () => {
    setWarninigModalOpen(false); // Close warning modal
    if (current == 0) {
      // If the current tab is for approval/rejection
      handleReject(referralId, refetch); // Handle rejection
    }
  };

  // Handler for approval button
  const handleApprovebtn = () => {
    setWarninigModalOpen(false); // Close warning modal
    if (current == 0) {
      // If the current tab is for approval/rejection
      handleApprove(referralId, refetch); // Handle approval
    } else if (current == 2) {
      // If the current tab is for deletion
      handleDelete(referralId); // Handle deletion
    }
  };

  // Handler for options
  const handleOptions = (
    selectedTabId: number,
    referral: any,
    referralId: string
  ) => {
    setCurrent(selectedTabId); // Set the current tab index

    if (selectedTabId == 0) {
      setWarninigModalOpen(true); // Open warning modal
      setreferralId(referralId); // Set referral ID
    } else if (selectedTabId == 1) {
      // If the selected tab is for editing
      setValue({ title: referral.customer?.name, id: referral.customer?.id });
      setInputData({
        discount: referral.discountPercentage,
        couponcode: referral.couponCode && referral.couponCode,
      });
      setTitle({
        heading: "Edit Referral",
        disable: true,
      }); // Set title for editing
      setAddReferral(true); // Enable add referral
    } else if (selectedTabId == 2) {
      setWarning({
        id: selectedTabId,
        btnFirstName: "Delete",
        btnSecName: "Cancel",
        title: "You Want to Delete the Referral?",
      });
      setWarninigModalOpen(true);
      setreferralId(referral.customer?.id);
    }
  };

  return {
    value,
    setValue,
    handleRejectbtn,
    handleApprovebtn,
    handleOptions,
    warning,
    setWarning,
    title,
    setTitle,
    inputData,
    setInputData,
    current,
  };
};

export const useGetReferrals = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setdata] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    Referral.getReferral()
      .then((res) => {
        if (res.success) {
          setdata(res.data.results);
        } else {
          setError("Failed to retrieve referral data");
        }
      })
      .catch((err) => {
        setError("An error occurred while fetching referral data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { data, loading, error, refetch };
};

export const useApproveReferral = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const handleApprove = (id: string, refetch: any) => {
    setLoading(false);
    Referral.ApproveReferral(id)
      .then((res) => {
        if (res.success) {
          refetch();
          setLoading(true);
          snackbar.SnackbarHandler(
            true,
            "success",
            "Your Referral Approved Successfully"
          );
        }
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleApprove, loading };
};

export const useRejectReferral = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const handleReject = (id: string, refetch: any) => {
    setLoading(false);
    Referral.RejectReferral(id)
      .then(() => {
        refetch();
        setLoading(true);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Referral Rejected Successfully"
        );
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleReject, loading };
};

export const useCreateReferral = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleCreate = (formateData: {}) => {
    setLoading(true);
    Referral.CreateReferral(formateData)
      .then(() => {
        setLoading(false);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Referral Created Successfully"
        );
        window.location.reload();
      })
      .catch((err) => {
        snackbar.SnackbarHandler(true, "error", err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleCreate, loading };
};

export const useDeleteReferral = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const handleDelete = (customerId: string) => {
    setLoading(false);
    Referral.DeleteReferral(customerId)
      .then(() => {
        setLoading(true);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Referral Delete Successfully"
        );
        window.location.reload();
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleDelete, loading };
};

export const useUpdateReferral = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleUpdate = (id: string, formateData: {}) => {
    setLoading(true);
    Referral.updateReferral(id, formateData)
      .then(() => {
        setLoading(false);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Referral Updated Successfully"
        );
        window.location.reload();
      })
      .catch((err) => {
        snackbar.SnackbarHandler(true, "error", err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleUpdate, loading };
};
