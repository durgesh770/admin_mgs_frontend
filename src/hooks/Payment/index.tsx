import { useEffect, useState } from "react";
import { PaymentService } from "@/services"; // Import your service file

import { removeEmptyValues } from "@/utils/tools";

//interface
import { PaymentResults } from "@/interface/Customer";

export const collectPaymentFromStripe = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (body = {}) => {
    setLoading(true);

    const res = await PaymentService.collectPaymentFromStripe(
      removeEmptyValues(body)
    ).finally(() => {
      setLoading(false);
    });

    if (!res?.success) return;
    window.location.href = res.data.redirect_url;

    return res;
  };

  return { submit, loading };
};

export const collectManualPayment = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (body = {}) => {
    setLoading(true);

    const res = await PaymentService.collectManualPayment(
      removeEmptyValues(body)
    ).finally(() => {
      setLoading(false);
    });

    if (!res?.url) return;
    window.location.href = res.url;

    return res;
  };

  return { submit, loading };
};

export const collectLater = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // Define a function to trigger a re-fetch
  const submit = async (body = {}) => {
    setLoading(true);

    const res = await PaymentService.collectLater(
      removeEmptyValues(body)
    ).finally(() => {
      setLoading(false);
    });

    if (!res?.url) return;
    window.location.href = res.url;

    return res;
  };

  return { submit, loading };
};

export const getPaymentHistory = () => {
  const [data, setdata] = useState<PaymentResults>({
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

  const setPage = (page: number) => {
    setparams({ ...params, page: page });
  };

  useEffect(() => {
    PaymentService.getPaymentHistory(removeEmptyValues(params))
      .then((res: any) => {
        setdata({
          ...res.data,
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

  return { data, setPage, refetch, setparams, loading, showLoadMore, loadMore };
};

export const useGetSingleViewInvoice = (id: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    PaymentService.getInvoice(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return { data };
};
