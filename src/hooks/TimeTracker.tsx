import { useSnackbar } from "@/context/GlobalContext";
import { Appointment } from "@/interface/Appointment";
import { timeTracker } from "@/interface/Reports";
import { TimeTracker } from "@/services/TimeTracker";
import { getLastDate } from "@/utils/tools";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useGetTimeTracker = (setParams: any, params: any) => {
  const [timeData, setData] = useState<timeTracker>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });
  const [loading, setLoading] = useState(true);

  const setPage = (page: number) => {
    setParams({ ...params, page: page });
  };

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };
  useEffect(() => {
    TimeTracker.getAllTimeTracker(params)
      .then((res) => {
        setData({
          ...res.data,
          results: res.data.results,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { loading, timeData, setPage, setParams, refetch, refetchCounter };
};

export const useCreateTime = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const handleCreateTime = (formateData = {}, refetch: any) => {
    setLoading(false);
    TimeTracker.createTimeTracker(formateData)
      .then(() => {
        setLoading(true);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Time Added Successfully"
          );
          if (refetch) {
            refetch();
          } else {
            window.location.reload();
            window.location.href = "/team-members/manage-payroll";
        }
      })
      .catch((err) => snackbar.SnackbarHandler(true, "error", err.response?.data?.message || "An error occurred"))
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleCreateTime, loading };
};

export const useUpdateTimeTrackerStatus = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const handleUpdateStatus = (id: string, body = {}) => {
    setLoading(false);
    TimeTracker.UpdateStatusTimeTracker(id, body)
      .then(() => {
        setLoading(true);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Status Updated Successfully"
        );
      })
      .catch((err) => snackbar.SnackbarHandler(true, "error", err.response?.data?.message || "An error occurred"))
      
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleUpdateStatus, loading };
};

export const useGetThisEarning = () => {
  const [thisData, setdata] = useState({
    totalAmount: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };
  const [params, setParams] = useState<{} | null>({
    from: moment(new Date()).format("YYYY-MM-DD"),
    to: moment(new Date()).format("YYYY-MM-DD"),
  });

  useEffect(() => {
    TimeTracker.getTotalAmount(params)
      .then((res) => {
        setdata(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { thisData, refetch, loading, setParams };
};

export const useGetWeekEarning = () => {
  const [data, setdata] = useState({
    totalAmount: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const currentDate = moment();

  // Add 7 days to the current date
  const current = currentDate.subtract(7, "days");

  const [params, setParams] = useState<{} | null>({
    from: current.format("YYYY-MM-DD"),
    to: moment(new Date()).format("YYYY-MM-DD"),
  });
  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    TimeTracker.getTotalAmount(params)
      .then((res) => {
        setdata(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { data, refetch, loading, setParams };
};

export const useGetMonthEarning = () => {
  const [last, setdata] = useState({
    totalAmount: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const [params, setParams] = useState<{} | null>({
    from: getLastDate("Monthly"),
    to: moment(new Date()).format("YYYY-MM-DD"),
  });

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    TimeTracker.getTotalAmount(params)
      .then((res) => {
        setdata(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { last, refetch, loading, setParams };
};

export const useDeleteTimeTracker = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const handleDelete = (trackerId: string, refetch: any, setModalOpen: any) => {
    setLoading(false);
    TimeTracker.deleteTimeTracker(trackerId)
      .then(() => {
        refetch();
        setLoading(true);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Data Delete Successfully"
        );
        setModalOpen(false);
      })
      .catch((err) => snackbar.SnackbarHandler(true, "error", err.response?.data?.message || "An error occurred"))

      .finally(() => {
        setLoading(true);
      });
  };

  return { handleDelete, loading };
};

export const useDeleteInsideDataTimeTracker = () => {
  const snackbar = useSnackbar();
  const [deleteLoading, setLoading] = useState(true);

  const handleDelete = (
    trackerId: string,
    entryId: string,
    refetch: any,
    setModalOpen: any
  ) => {
    setLoading(false);
    TimeTracker.deleteInsideTimeTracker(trackerId, entryId)
      .then(() => {
        refetch();
        setLoading(true);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Data Delete Successfully"
        );
        setModalOpen(false);
      })
      .catch((err) => snackbar.SnackbarHandler(true, "error", err.response?.data?.message || "An error occurred"))

      .finally(() => {
        setLoading(true);
      });
  };

  return { handleDelete, deleteLoading };
};

export const useUpdateDataTimeTracker = () => {
  const snackbar = useSnackbar();
  const [loader, setLoading] = useState(true);

  const handleUpdate = (
    trackerId: string,
    body = {},
    refetch: any,
    toggleDrawer: any
  ) => {
    setLoading(false);
    TimeTracker.UpdateInsideDataTimeTracker(trackerId, body)
      .then(() => {
        refetch();
        setLoading(true);
        snackbar.SnackbarHandler(true, "success", "Data Updated Successfully");
        toggleDrawer();
      })
      .catch((err) => snackbar.SnackbarHandler(true, "error", err.response?.data?.message || "An error occurred"))

      .finally(() => {
        setLoading(true);
      });
  };

  return { handleUpdate, loader };
};

export const useUpdateInsideTimeTrackerEntry = () => {
  const snackbar = useSnackbar();
  const [loader, setLoading] = useState(true);

  const handleUpdateEntry = (
    trackerId: string,
    entryId: string,
    body = {},
    refetch: any
  ) => {
    setLoading(false);
    TimeTracker.updateInsideTimeTracker(trackerId, entryId, body)
      .then(() => {
        refetch();
        setLoading(true);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Data Updated Successfully"
        );
      })
      .catch((err) => snackbar.SnackbarHandler(true, "error", err.response?.data?.message || "An error occurred"))
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleUpdateEntry, loader };
};

export const useGetTodayAppointment = (teamMemberId: string) => {
  const [data, setdata] = useState<Appointment[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    TimeTracker.getTodayAppointment(teamMemberId)
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { data, refetch, loading };
};
