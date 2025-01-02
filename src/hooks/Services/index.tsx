import { useEffect, useState } from "react";
import { ServicesService } from "@/services"; // Import your service file

//interface
import { Service } from '@/interface/Service'; // Import your service file
import { useSnackbar } from '@/context/GlobalContext';
import { removeEmptyValues } from '@/utils/tools';

export const getServices = (limit = 10) => {
  const [res, setRes] = useState({
    results: [],
    page: 0,
    limit: 0,
    totalPages: 0,
    totalResults: 0
  })
  const [data, setdata] = useState<Service[]>([]);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  const [params, setparams] = useState({
    page: 1,
    limit: limit,
  });


  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };
  const setPage = (page: number) => {
    setparams({ ...params, page: page });
  }

  useEffect(() => {
    ServicesService.getAllServices(removeEmptyValues(params)).then((res) => {
      setRes(res.data);
      setdata([...res.data.results]);
    });
  }, [refetchCounter, params]);

  return { data, res, setPage, refetch };
};

export const createService = () => {
  let alert = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = (body = {}) => {
    setLoading(true);

    ServicesService.createService(body)
      .catch((err) => {
        setLoading(false);
        alert.SnackbarHandler(
          true,
          "error",
          err.response?.data?.message || "An error occurred"
        );
      })
      .then((res) => {
        if (res?.success) {
          setLoading(false);
          alert.SnackbarHandler(
            true,
            "success",
            "Service created successfully"
          );
          window.location.href = "/services";
        }
      });
  };

  return { submit, loading };
};

export const updateService = (serviceId: string) => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = (body = {}) => {
    setLoading(true);

    ServicesService.updateService(serviceId, body)
      .catch((err) => {
        setLoading(false)
        alert.SnackbarHandler(
          true,
          "error",
          err.response?.data?.message || "An error occurred"
        );
      })
      .then((res) => {
        if (res?.success) {
          setLoading(false)
          alert.SnackbarHandler(
            true,
            "success",
            "Service updated successfully"
          );
          window.location.href = "/services";
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { submit, loading };
};

export const deleteService = (serviceId: string) => {
  let alert = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = () => {
    setLoading(true);

    ServicesService.deleteService(serviceId)
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
            "Service deleted successfully"
          );
          window.location.href = "/services";
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { submit, loading };
};
