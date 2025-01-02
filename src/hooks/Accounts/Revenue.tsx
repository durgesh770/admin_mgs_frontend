"use client";
import { useSnackbar } from "@/context/GlobalContext";
import { ReportsProps, totalRevenue } from "@/interface/Reports";
import { Revenue } from "@/services/Revenue";
import { useEffect, useState } from "react";

export const useGetBookingRevenue = () => {
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
    Revenue.GetBookingRevenue(params)
      .then((res) => {
        setdata({ ...res.data });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  const showLoadMore =
    revenue.totalPages != 0 && revenue.totalPages != params.page;

  const loadMore = () => {
    setparams({ ...params, page: params.page + 1 });
  };

  return { revenue, refetch, loading, setPage, loadMore, showLoadMore };
};

export const useGetTotalRevenue = () => {
  const [totalRevenue, setdata] = useState<totalRevenue>({
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
    Revenue.GetTotalRevenue()
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { totalRevenue, refetch, loading };
};

export const useGetOtherRevenue = () => {
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
    Revenue.GetOtherRevenue(params)
      .then((res) => {
        setdata({ ...res.data });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { revenue, refetch, loading , setPage};
};

export const useDeleteRevenue = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(true);

  const handleDelete = (revenueId: string, entryId: string) => {
    setLoading(false);
    Revenue.DeleteRevenue(revenueId, entryId)
      .then((res) => {
        setLoading(true);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Revenue Delete Successfully"
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

export const useCreateRevenue = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleCreate = (formateData: any) => {
    setLoading(true);
    Revenue.createOtherRevenue(formateData)
      .then((res) => {
        setLoading(false);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Revenue Created Successfully"
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

export const useUpdateRevenue = () => {
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleUpdate = (revenueId: string, entryId: string, form = {}) => {
    setLoading(true);
    Revenue.updateOtherRevenue(revenueId, entryId, form)
      .then((res) => {
        setLoading(false);
        snackbar.SnackbarHandler(
          true,
          "success",
          "Your Revenue Updated Successfully"
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

export const useGetOtherRevenueChart = () => {
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
    Revenue.getOtherRevenueChart(params)
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { chart, refetch, loading, setParams};
};

export const useGetRevenueChart = () => {
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
    Revenue.getRevenueChart(params)
      .then((res) => {
        setdata(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return {chart, refetch, loading, setParams};
};

