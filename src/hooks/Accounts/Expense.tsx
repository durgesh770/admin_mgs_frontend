"use client";
import { useSnackbar } from "@/context/GlobalContext";
import { ReportsProps, totalRevenue } from "@/interface/Reports";
import { Revenue } from "@/services/Revenue";
import { useEffect, useState } from "react";

export const useGetBookingExpense = () => {
  const [revenue, setdata] = useState<ReportsProps>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [params, setparams] = useState({
    page: 1,
    limit: 10,
  });
  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  const setPage = (page: number) => {
    setparams({ ...params, page: page });
  };

  useEffect(() => {
    Revenue.GetBookingExpense(params)
      .then((res) => {
        setdata({ ...res.data });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { revenue, refetch, loading, setPage };
};

export const useGetTotalExpense = () => {
  const [totalExpense, setdata] = useState<totalRevenue>({
    amount: "0",
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
    Revenue.GetTotalExpense()
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { totalExpense, refetch, loading };
};

export const useGetOtherExpense = () => {
  const [revenue, setdata] = useState<ReportsProps>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [params, setparams] = useState({
    page: 1,
    limit: 10,
  });
  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  const setPage = (page: number) => {
    setparams({ ...params, page: page });
  };

  useEffect(() => {
    Revenue.GetOtherExpense()
      .then((res) => {
        setdata({ ...res.data });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { revenue, refetch, loading, setPage };
};

export const useDeleteExpense = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const handleDelete = (revenueId: string, entryId: string) => {
    setLoading(false);
    Revenue.DeleteExpense(revenueId, entryId)
      .then((res) => {
        setLoading(true);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Expense Delete Successfully"
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

export const useCreateExpense = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleCreate = (formateData: any) => {
    setLoading(true);
    Revenue.createOtherExpense(formateData)
      .then((res) => {
        setLoading(false);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Expense Created Successfully"
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

export const useUpdateExpense = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleUpdate = (revenueId: string, entryId: string, form = {}) => {
    setLoading(true);
    Revenue.updateOtherExpense(revenueId, entryId, form)
      .then((res) => {
        setLoading(false);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Expense Updated Successfully"
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

  return { handleUpdate, loading };
};

export const useGetOtherExpenseChart = () => {
  const [chart, setdata] = useState([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [params, setParams] = useState<{} | null>({
    from: "",
    to: "",
  });

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    Revenue.getOtherExpenseChart(params)
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { chart, refetch, loading ,setParams};
};

export const useGetExpenseChart = () => {
  const [chart, setdata] = useState([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [params, setParams] = useState<{} | null>({
    from: "",
    to: "",
  });
  
  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    Revenue.getExpenseChart(params)
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { chart, refetch, loading ,setParams };
};
