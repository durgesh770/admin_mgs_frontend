import { useEffect, useState } from "react";
import {
  AppointmentService,
} from "@/services"; 

import { useSnackbar } from "@/context/GlobalContext";
import { removeEmptyValues } from "@/utils/tools";

//interface
import { AppointmentResults } from "@/interface/Appointment";

export const createAppointment = () => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (body = {}) => {
    setLoading(true);

    const res = await AppointmentService.createAppointment(body)
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

    if (res?.success) {
      alert.SnackbarHandler(
        true,
        "success",
        "Appointment created successfully"
      );
      window.location.href = "/appointments/all-appointment";
    }
    return res;
  };

  return { submit, loading };
};

export const getAppointmentById = (appointmentId: string) => {
  const [data, setdata] = useState<null>(null);

  const [params, setparams] = useState({
    title: "",
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    AppointmentService.getAppointmentById(appointmentId)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        setdata(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  return { data, loading, setparams };
};

export const getAllAppointments = () => {
  const [data, setdata] = useState<AppointmentResults>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [params, setparams] = useState({
    page: 1,
    limit: 10,
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

  const setPage = (page: number) => {
    setparams({ ...params, page: page });
  };

  useEffect(() => {
    AppointmentService.getAllAppointment(removeEmptyValues(params))
      .then((res) => {
        setdata({ ...res.data, results: [...res.data.results] });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  const showLoadMore = data.totalPages != 0 && data.totalPages != params.page;

  return {
    data,
    refetch,
    params,
    setparams,
    loading,
    loadMore,
    showLoadMore,
    setPage,
  };
};

export const getAllApprovedAppointments = () => {
  const [data, setdata] = useState<AppointmentResults>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [params, setparams] = useState({
    page: 1,
    limit: 10,
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

  const setPage = (page: number) => {
    setparams({ ...params, page: page });
  };

  useEffect(() => {
    AppointmentService.getAllApprovedAppointment(removeEmptyValues(params))
      .then((res) => {
        setdata({ ...res.data, results: [...res.data.results] });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, params]);

  const showLoadMore = data.totalPages != 0 && data.totalPages != params.page;

  return { data, refetch, setparams, loading, loadMore, showLoadMore, setPage };
};

export const approvedAppointment = () => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (id = "") => {
    setLoading(true);

    const res = await AppointmentService.approvedAppointment(id)
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

    if (res?.success) {
      alert.SnackbarHandler(
        true,
        "success",
        "Appointment Approved successfully"
      );
      window.location.href = "/appointments/approved-appointment";
    }
    return res;
  };

  return { submit, loading };
};

export const rescheduleAppointment = () => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (id = "", body: any) => {
    setLoading(true);

    const res = await AppointmentService.rescheduleAppointment(id, body)
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

    if (res?.success) {
      alert.SnackbarHandler(
        true,
        "success",
        "Appointment reschedule successfully"
      );
      window.location.href = "/appointments/view/" + id;
    }
    return res;
  };

  return { submit, loading };
};

export const rejectedAppointment = () => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (id = "") => {
    setLoading(true);

    const res = await AppointmentService.rejectedAppointment(id)
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

    if (res?.success) {
      alert.SnackbarHandler(
        true,
        "success",
        "Appointment rejected successfully"
      );
      window.location.href = "/appointments/all-appointment";
    }
    return res;
  };

  return { submit, loading };
};

export const deleteAppointment = () => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (id = "") => {
    setLoading(true);

    const res = await AppointmentService.deleteAppointment(id)
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

    if (res?.success) {
      alert.SnackbarHandler(
        true,
        "success",
        "Appointment deleted successfully"
      );
      window.location.reload();
    }
    return res;
  };

  return { submit, loading };
};

export const cancelAppointment = () => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (id = "", refundPayment: boolean) => {
    setLoading(true);

    const res = await AppointmentService.cancelAppointment(id, refundPayment)
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

    if (res?.success) {
      alert.SnackbarHandler(
        true,
        "success",
        "Appointment cancelled successfully"
      );
      window.location.href = "/appointments/all-appointment";
    }
    return res;
  };

  return { submit, loading };
};

export const getPatientNotes = (body: any) => {
  const [data, setdata] = useState<AppointmentResults>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [getloading , setGetLoading] = useState(true)

  useEffect(() => {
    AppointmentService.getAllNotes(body).then((res: any) => {
      setdata({ ...res.data, results: [...res.data.results] });
    }).finally(()=>{
      setGetLoading(false)
    })
  }, []);

  return {data, getloading};
};

export const addAllNotes = () => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (id: any, body = {}) => {
    setLoading(true);
    const res = await AppointmentService.addAllNotes(id, body)
      .catch((err) => {
        alert.SnackbarHandler(
          true,
          "error",
          err.response?.data?.message || "An error occurred"
        );
      })
    return res;
  };

  return { submit, loading , setLoading};
};

export const useCreateChangeRequest = (id: string, body = {}) => {
  const [data, setdata] = useState<any>({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmitComment = () => {
    setLoading(true);
    AppointmentService.createChangeRequest(id, body).then((res: any) => {
      if (res.success) {
        setLoading(false);
        window.location.reload();
      }
    });
  };
  return { handleSubmitComment, data ,loading};
};

export const useConfirmedAppointment = () => {
  const Snackbar = useSnackbar();
  const [loading, setloading] = useState(true);

  const handleConfirmed = (id: string) => {
    setloading(false);
    AppointmentService.confirmedAppointment(id).then((res) => {
      if (res.success) {
        setloading(true);
        Snackbar.SnackbarHandler(
          true,
          "success",
          "Your Appointment Updated Successfully"
        );
        window.location.reload()      }
    });
  };
  return { handleConfirmed, setloading, loading };
};

