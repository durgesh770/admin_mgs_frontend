"use client";
// react
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// component
import PageTitle from "@/components/ui/PageTitle";
import Paymentbooktable from "@/components/ui/PaymentHistoryUI/Paymentbooktable";
import PaymentbookmobileUI from "@/components/ui/PaymentHistoryUI/Paymentbookmobileui";
import PaymentFilterFeature from "./PaymentFilterFeatures";
import PaginationFeature from "../Appointments/PaginationFeature/PaginationFeature";
import CollectPaymentModal from "../Appointments/AppointmentsPopup/CollectPayment";

// hooks
import { useActionHooks } from "@/hooks/Appointment/ActionHooks";
import { getPaymentHistory } from "@/hooks/Payment";

// context
import { useAuth } from "@/context/AuthContext";
// mui
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import { Description, Receipt } from "@mui/icons-material";

const PaymentHistoryfeature = () => {
  const [check, setCheck] = useState(true);
  const [appointment, setAppointment] = useState<any>([]);

  const { permissions } = useAuth();
  const router = useRouter();
  const { data, setparams, loading, setPage } = getPaymentHistory();
  // payment modal hook
  useEffect(() => {
    if (!loading) {
      setCheck(true);
    }
  }, [data]);
  
  const { collectPayment, setCollectPayment, handleActionClick } =
    useActionHooks({ appointments: appointment });

  // three dot options
  const options = [
    {
      title: "Collect payment",
      line: true,
      icon: <AttachMoneyRoundedIcon />,
      id: "Collect payment",
      url: true,
    },
    {
      title: "View Invoice",
      line: false,
      icon: <Receipt />,
      id: "view-invoice",
      url: true,
    },
    {
      title: "Patient Notes",
      line: false,
      icon: <Description />,
      id: "view-notes",
      url: true,
    },
  ].filter((i) => {
    if (i.id == "view-invoice") return permissions.includes("view_invoice");
    return true;
  });

  // handle button of three dots
  const handleOptions = (options: any, item: any) => {
    if (options.id == "view-invoice") {
      router.push(`/payments/view-invoice/${item?.appointmentId.paymentId}`);
    }
    if (options.id == "view-notes") {
      router.push(`/appointments/view/${item?.appointmentId._id}?notes=true`);
    }

    if (options.id == "Collect payment") {
      handleActionClick(item.appointmentId.id, { id: "collect-payment" });
    }
  };

  return (
    <>
      <div className="pb-5 container-ful min-h-screen">
        <div className="pt-6">
          <PageTitle title={"Payment History"} />
        </div>
        {!loading && (
          <>
            <PaymentFilterFeature
              setData={(filter: any) => {
                setparams((old: any) => ({
                  ...old,
                  query_services: filter.serviceFilter,
                  query_teams: filter.teamMemberFilter,
                  status: filter.appointmentStatusFilter,
                  payment_status: filter.paymentStatusFilter,
                  date: filter.dateFilter,
                  query_customers: filter.customerFilter,
                }));
              }}
              check={check}
              setCheck={setCheck}
            />

            {data?.results?.length > 0 ? (
              <div className="container-sub">
                <div className="hidden overflow-auto lg:block bg-[--brand-white-color] border  mt-3">
                  <Paymentbooktable
                    handleOptions={handleOptions}
                    paymentdata={data.results}
                    options={options}
                    setAppointment={setAppointment}
                  />
                </div>
                <div className="block lg:hidden mt-3">
                  {data?.results.map((item: any, key: number) => {
                    return (
                      <PaymentbookmobileUI
                        handleOptions={handleOptions}
                        item={item}
                        key={key}
                        index={key}
                        options={options}
                        setAppointment={setAppointment}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="min-w-[50px] justify-center flex items-center h-[60vh]">
                Payment Not Found
              </div>
            )}
          </>
        )}

        {/* pagination */}
        <PaginationFeature totalPage={data.totalPages} setPage={setPage} />
      </div>

      {/* payment modal */}
      {collectPayment.open && (
        <CollectPaymentModal
          open={collectPayment.open}
          setOpen={() => setCollectPayment((old) => ({ ...old, open: false }))}
          customerId={collectPayment.customerId}
          appointmentId={collectPayment.appointmentId}
          amount={collectPayment.amount}
          appointmentData={collectPayment.appointmentData}
        />
      )}
    </>
  );
};

export default PaymentHistoryfeature;
