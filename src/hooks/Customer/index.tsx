import { useEffect, useState } from "react";
import { CustomerService, TeamMemberService } from "@/services"; // Import your service file

//interface
import { useSnackbar } from "@/context/GlobalContext";
import {
  Customer,
  BookingResults,
  PaymentResults,
  Data,
} from "@/interface/Customer";
import { removeEmptyValues, removeQuery } from "@/utils/tools";
import { useRouter } from 'next/navigation';

interface DefaultParams {
  defaultParams?: any;
}

export const getCustomers = ({ defaultParams }: DefaultParams) => {
  const [res, setRes] = useState({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });
  const [data, setdata] = useState<Customer[]>([]);

  const [params, setparams] = useState<any>(
    defaultParams || {
      name: "",
    }
  );
  const [loading, setLoading] = useState<boolean>(true);

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
    setLoading(true);

    CustomerService.getAllCustomer(removeEmptyValues(params))
      .then((res) => {
        setRes(res.data);
        setdata([...res.data.results]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { data, res, refetch, loading, params, setparams, setPage };
};

export const getSingleCustomer = (customerId: string) => {
  const [data, setdata] = useState<null>(null);

  const [params, setparams] = useState({
    title: "",
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
    CustomerService.getSingleMember(customerId)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        setdata(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  return { data, refetch, setparams, loading };
};

export const updateMember = (memberId: string) => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = (body = {}) => {
    setLoading(true);

    TeamMemberService.updateMemberById(memberId, body)
      .catch((err) => {
        alert.SnackbarHandler(
          true,
          "error",
          err.response?.data?.message || "An error occurred"
        );
      })
      .then((res) => {
        if (res?.success) {
          alert.SnackbarHandler(true, "success", "Member updated successfully");
          window.location.reload();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { submit, loading };
};

export const createMember = () => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = (body = {}) => {
    setLoading(true);

    TeamMemberService.createMember(body)
      .catch((err) => {
        alert.SnackbarHandler(
          true,
          "error",
          err.response?.data?.message || "An error occurred"
        );
      })
      .then((res) => {
        if (res?.success) {
          alert.SnackbarHandler(true, "success", "Member created successfully");
          window.location.href = "/team-members";
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { submit, loading };
};

export const manageNotes = (memberId: string) => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = (body = {}) => {
    setLoading(true);

    CustomerService.manageNotes(memberId, body)
      .catch((err) => {
        alert.SnackbarHandler(
          true,
          "error",
          err.response?.data?.message || "An error occurred"
        );
      })
      .then((res) => {
        if (res?.success) {
          alert.SnackbarHandler(
            true,
            "success",
            "Customer notes updated successfully"
          );
          window.location.reload();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { submit, loading };
};

export const getUpcomingAppointments = (customerId: string) => {
  const [data, setdata] = useState<BookingResults>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [params, setparams] = useState({
    page: 1,
    limit: 3,
  });

  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  const loadMore = () => {
    setparams({ ...params, page: params.page + 1 });
  };

  useEffect(() => {
    CustomerService.getUpcomingAppointments(
      customerId,
      removeEmptyValues(params)
    )
      .then((res) => {
        setdata({
          ...res.data,
          results: [...data.results, ...res.data.results],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  const showLoadMore = data.totalPages != 0 && data.totalPages != params.page;

  return { data, refetch, setparams, loading, loadMore, showLoadMore };
};

export const getPastAppointments = (customerId: string) => {
  const [data, setdata] = useState<BookingResults>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [params, setparams] = useState({
    page: 1,
    limit: 3,
  });

  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  const loadMore = () => {
    setparams({ ...params, page: params.page + 1 });
  };

  useEffect(() => {
    CustomerService.getPastAppointments(customerId, removeEmptyValues(params))
      .then((res) => {
        setdata({
          ...res.data,
          results: [...data.results, ...res.data.results],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  const showLoadMore = data.totalPages != 0 && data.totalPages != params.page;

  return { data, refetch, setparams, loading, loadMore, showLoadMore };
};

export const getPaymentHistory = (customerId: string) => {
  const [data, setdata] = useState<PaymentResults>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });
  const [params, setparams] = useState({
    page: 1,
    limit: 5,
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
    CustomerService.getPaymentHistory(customerId, removeEmptyValues(params))
      .then((res: any) => {
        setdata({
          ...res.data,
          results: [...data.results, ...res.data.results],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  const showLoadMore = data.totalPages != 0 && data.totalPages != params.page;
  const loadMore = () => {
    setparams({ ...params, page: params.page + 1 });
  };

  return { data, refetch, setparams, loading, showLoadMore, loadMore };
};

export const getSavedCards = (customerId: string) => {
  const [data, setdata] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    setLoading(true);

    CustomerService.getSavedCards(customerId)
      .then((res) => {
        setdata([...res.data]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter]);

  return { data, refetch, loading };
};

export const getIntakeform = (customerId: string) => {
  const [data, setdata] = useState<Data | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    CustomerService.getIntakeform(customerId)
      .then((res: any) => {
        if (res.data) {
          setdata(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading };
};

export const getBtnIntakeForm = (id: string) => {
  let alert = useSnackbar();

  const handleAccept = () => {
    CustomerService.manageIntakeform(id, {
      edit_request_status: "approved",
    }).then((res) => {
      if (res.success) {
        alert.SnackbarHandler(true, "success", res.message);
        window.location.reload();
      }
    });
  };

  const handleReject = () => {
    CustomerService.manageIntakeform(id, {
      edit_request_status: "reject",
    }).then((res) => {
      if (res.success) {
        alert.SnackbarHandler(true, "success", res.message);
        window.location.reload();
      }
    });
  };

  return { handleReject, handleAccept };
};

export const CreateCustomer = () => {
  const [loader, setLoader] = useState(true);
  let alert = useSnackbar();

  const [formData, setFromData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    RefId: "",
    dob: "",
  });

  const submit = () => {
    setLoader(false);
    CustomerService.createCustomer(formData)
      .then((res) => {
        if (res.success) {
          setLoader(true);
          window.location.reload();
        }
      })
      .catch((err) => {
        alert.SnackbarHandler(true, "error", err.response.data.message);
      })
      .finally(() => {
        setLoader(true);
      });
  };

  return { setFromData, formData, submit, loader };
};

export const useUpdateCustomer = (id: string, formData: any) => {
  const [loading, setLoading] = useState(true);
  let alert = useSnackbar();

  const submit = () => {
    setLoading(false);
    CustomerService.updateCustomer(id, formData)
      .then((res) => {
        if (res.success) {
          setLoading(true);
          alert.SnackbarHandler(true, "success", res.message);
          // window.location.reload();
        }
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { submit, loading };
};

export const useDeleteCustomer = () => {
  let alert = useSnackbar();

  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteCustomer = (id: string) => {
    setIsLoading(false);
    CustomerService.deleteCustomer(id)
      .then((res) => {
        window.location.href="/customers"
        if (res.success) {
          alert.SnackbarHandler(true, "success", "Deleted Successfully");
          // window.location.reload();
        }
      })
      .catch((err) => {
        alert.SnackbarHandler(
          true,
          "error",
          err.response.data?.data || err.response.data?.message
        );
      })
      .finally(() => {
        setIsLoading(true);
      });
  };

  return { handleDeleteCustomer, setIsLoading, isLoading };
};
