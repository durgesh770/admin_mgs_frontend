import { SMSService } from "../services/smsServices";
import { useState, useEffect } from "react";

export const useGetSMS = (customerId: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [msg, setMsg] = useState([]);

  // Add a state to track a refetch counter
  const [refetchCounter, setRefetchCounter] = useState<number>(0);

  // Define a function to trigger a re-fetch
  const refetch = () => {
    // Increment the refetch counter to force a re-fetch
    setRefetchCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    if (!customerId) return;
    SMSService.getSMS(customerId)
      .then((res) => {
        setMsg(res.fetchdata || []);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetchCounter, customerId]);

  return { msg, refetch, loading };
};

export const useSendSMS = () => {
  const [loading, setLoading] = useState(true);

  const handleSendSMS = (body: any) => {
    setLoading(false);
    SMSService.sendSMS(body)
      .then((res) => {
        if (res.success) {
          setLoading(true);
        }
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return { handleSendSMS, loading };
};
