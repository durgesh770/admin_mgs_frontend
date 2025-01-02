"use client";
import { useSnackbar } from "@/context/GlobalContext";
import { Leave } from "@/interface/LeaveRequest";
import { LeaveRequest } from "@/services/calenderLeave";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export const useLongMenuLeaveRequest = ({
  handleApprovedLeave,
  handleDeleteLeave,
  setDrawerOpen,
  setCurrentbtn,
  currentbtn,
  setDefaultModal,
}: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [commentAdmin, setCommentAdmin] = useState(false);
  const [warning, setWarning] = useState({
    id: 0,
    btnFirstName: "",
    btnSecName: "",
    title: "",
  });

  const option = [
    { id: 2, title: "Delete", icon: <DeleteIcon />, line: false },
  ];

  // handle three dot btn
  const handleOptions = (option: any, item: Leave) => {
    if (option.id == 1) {
      setDefaultModal(false);
      setDrawerOpen(true);
      //@ts-ignore
      setCurrentbtn({ currentOptions: option.id, id: item });
    } else if (option.id == 2) {
      setCurrentbtn({ currentOptions: option.id, id: item.id });
      setWarning({
        id: option.id,
        btnFirstName: "Delete",
        btnSecName: "No",
        title: "Are you sure you want to delete ?",
      });
      setModalOpen(true);
    } else if (option.id == 3) {
      setWarning({
        id: option.id,
        btnFirstName: "Approve",
        btnSecName: "Reject",
        title: "You Want to Approve or Reject the Leave ?",
      });
      setCurrentbtn({ currentOptions: option.id, id: item.id });
      setModalOpen(true);
    }
  };

  // handle warning modal left btn
  const handleLeftBtnClick = () => {
    if (currentbtn.currentOptions == 1) {
    } else if (currentbtn.currentOptions == 2) {
      handleDeleteLeave(currentbtn.id);
    } else if (currentbtn.currentOptions == 3) {
      handleApprovedLeave(currentbtn.id);
    }
  };

  // handle warning modal rigth btn
  const handleRightBtnClick = () => {
    if (currentbtn.currentOptions == 3) {
      setModalOpen(false);
      setCommentAdmin(true);
    } else if (currentbtn.currentOptions == 2) {
      setModalOpen(false);
    }
  };

  return {
    handleRightBtnClick,
    handleLeftBtnClick,
    handleOptions,
    warning,
    setModalOpen,
    modalOpen,
    commentAdmin,
    setCommentAdmin,
    option,
  };
};

export const useGetAllLeaveRequests = () => {
  const [leave, setLeave] = useState<Leave[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    LeaveRequest.getAllLeaveRequests()
      .then((res) => {
        setLeave(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { leave, refetch, loading };
};

export const useRejectLeaveRequests = () => {
  const alert = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);

  const handleRejectLeave = (id: string, adminComment: any) => {
    setLoading(true);
    LeaveRequest.RejectLeaveRequests(id, adminComment)
      .then((res) => {
        alert.SnackbarHandler(true, "success", res.message);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        alert.SnackbarHandler(true, "error", err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { handleRejectLeave, loading };
};

export const useApprovedLeaveRequests = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const alert = useSnackbar();

  const handleApprovedLeave = (id: string) => {
    LeaveRequest.ApprovedLeaveRequests(id)
      .then((res) => {
        alert.SnackbarHandler(true, "success", res.message);
        window.location.reload();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleApprovedLeave, loading };
};

export const useCreateLeaveRequests = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const alert = useSnackbar();

  const handleCreateLeave = (body: any) => {
    setLoading(true);
    LeaveRequest.createLeaveRequest(body)
      .then((res) => {
        setLoading(false);
        alert.SnackbarHandler(
          true,
          "success",
          "Request Leave created successfully"
        );
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        alert.SnackbarHandler(true, "error", err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleCreateLeave, loading };
};

export const useDeleteLeaveRequests = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const alert = useSnackbar();

  const handleDeleteLeave = (id: string) => {
    setLoading(true);
    LeaveRequest.DeleteLeaveRequest(id)
      .then((res) => {
        setLoading(false);
        alert.SnackbarHandler(
          true,
          "success",
          "Request Leave Deleted successfully"
        );
        window.location.reload();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleDeleteLeave, loading };
};

export const useUpdateLeaveRequests = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const alert = useSnackbar();

  const handleUpdateLeave = (id: string, body: any) => {
    setLoading(true);
    LeaveRequest.updateLeaveRequest(id, body)
      .then((res) => {
        setLoading(false);
        alert.SnackbarHandler(
          true,
          "success",
          "Request Leave Updated successfully"
        );
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        alert.SnackbarHandler(true, "error", err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleUpdateLeave, loading };
};

export const useLeaveDatesTeamMember = (teamMemberId: string) => {
  const [dates, setLeave] = useState<string[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    LeaveRequest.LeaveDatesbyTeamMember(teamMemberId)
      .then((res) => {
        setLeave(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { dates, refetch, loading };
};
