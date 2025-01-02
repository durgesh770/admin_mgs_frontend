import {
  MostBookableDays,
  MostBookableTimeslots,
  TopCustomers,
  TopPopularServices,
  TopServices,
  TopTeamMembers,
} from "@/interface/Reports";
import { Reports } from "@/services/Reports";
import { formatDateForFilter, getLastDate } from "@/utils/tools";
import moment from "moment";
import { useEffect, useState } from "react";

export const useAppointmentReportFilter = (setParams: any) => {
  const [filter, setFilter] = useState("none");

  //---------------- Date Range (start) ---------------
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });

  useEffect(() => {
    if (dateRange.from == null && dateRange.to == null && filter != "none") {
      setParams &&
        setParams({
          from: getLastDate(filter),
          to: moment().format("YYYY-MM-DD"),
        });
    } else {
      setParams &&
        setParams({
          from: formatDateForFilter(dateRange.from),
          to: formatDateForFilter(dateRange.to),
        });
    }
  }, [dateRange, filter]);

  return { setFilter, setDateRange, filter, dateRange };
};

export const useTopCustomer = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [customers, setCustomers] = useState<TopCustomers[] | []>([]);
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
    Reports.TopCustomers(params)
      .then((res) => {
        setCustomers(res.topCustomers);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { customers, loading, refetch, setParams };
};

export const useTopMembers = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [members, setMembers] = useState<TopTeamMembers[] | []>([]);
  const [params, setParams] = useState<{} | null>({
    from: "",
    to: "",
  });
  // Add a state to track a refetch  counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    Reports.TopMembers(params)
      .then((res) => {
        setMembers(res.topTeamMembers);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { members, loading, refetch, setParams };
};

export const useGrossingServices = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [gross, setMembers] = useState<TopServices[] | []>([]);
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
    Reports.GrossingServices(params)
      .then((res) => {
        setMembers(res.topGrossingServices);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { gross, loading, refetch, setParams };
};

export const useTopPopularServices = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [services, setMembers] = useState<TopPopularServices[] | []>([]);
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
    Reports.TopPopularServices(params)
      .then((res) => {
        setMembers(res.bestSellingServices);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { services, loading, refetch, setParams };
};

export const useLowServices = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [services, setMembers] = useState<TopPopularServices[] | []>([]);
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
    Reports.LowServices(params)
      .then((res) => {
        setMembers(res.bestSellingServices);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { services, loading, refetch, setParams };
};

export const useMostBookableTimeslots = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [timeslots, setMembers] = useState<MostBookableTimeslots[] | []>([]);
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
    Reports.MostBookableTimeslots(params)
      .then((res) => {
        setMembers(res.topTimeSlots);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { timeslots, loading, refetch, setParams };
};

export const useMostBookableDays = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [days, setMembers] = useState<MostBookableDays[] | []>([]);
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
    Reports.MostBookableDays(params)
      .then((res) => {
        setMembers(res.result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { days, loading, refetch, setParams };
};
