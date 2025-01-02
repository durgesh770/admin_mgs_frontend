import ClientInfo from "@/components/ui/Appointments/ClientInfo/ClientInfo";
import { getCustomers } from "@/hooks/Customer";
import { getQueryFromUrl } from "@/utils/tools";
import { useEffect, useState } from "react";

interface ClientInfo {
  defaultValue?: {
    title: string;
    value: string;
    data: {
      email: string;
      phone: string;
    };
  };
  setValue?: any;
}

interface ClientInfoFeaturesProps {
  clientData?: ClientInfo;
}

interface query {
  customer: string;
  date: string;
}

const ClientInfoFeatures = ({ clientData }: ClientInfoFeaturesProps) => {
  const [value, setValue] = useState<any>(clientData?.defaultValue || {});
  const query = getQueryFromUrl() as query;
 
  useEffect(() => {
    if (query.customer) {
      setValue({ title: query.customer });
    }
  }, [query.customer]);
  
  const [selectedData, setSelectedData] = useState({
    email: "",
    phone: "",
  });

  //integration
  const customerList = getCustomers({
    defaultParams: {
      limit: 10000,
    },
  });

  const list = customerList.data.map((item) => ({
    title: item.name,
    value: item._id,
    data: {
      email: item.email,
      phone: item.telephone,
    },
  }));

  useEffect(() => {
    if (!value?.data) return;
    setSelectedData({ email: value.data.email, phone: value.data.phone });
  }, [value]);

  useEffect(() => {
    clientData?.setValue({ ...value, ...selectedData });
  }, [value, selectedData]);

  return (
    <>
      <ClientInfo
        setSelectedData={setSelectedData}
        selectedData={{ email: value.data?.email, phone: value.data?.phone }}
        value={value}
        setValue={setValue}
        list={list}
        // disableInput={value.data}
        disabled={Boolean(clientData?.defaultValue?.value)}
      />
    </>
  );
};

export default ClientInfoFeatures;
