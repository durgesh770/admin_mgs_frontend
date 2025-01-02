//@ts-nocheck
"use client";
//react
import React, { useEffect, useState } from "react";
//component
import PageTitle from "@/components/ui/PageTitle";

import ManageAllAppointment from "../ManageAppointment/AllAppointment";

//integration
import { getAllAppointments } from "@/hooks/Appointment";
import WarningModal from "@/components/ui/Modal/Warning";
import PaginationFeature from "../PaginationFeature/PaginationFeature";
import CollectPaymentModal from "../AppointmentsPopup/CollectPayment";
//hooks
import { useActionHooks } from "@/hooks/Appointment/ActionHooks";
import SideDrawer from "@/components/ui/SideDrawer";
import ChatFeature from "@/features/Chatfeature/Chatfeature";

const AllAppointment = () => {
  const columns = [
    { id: "id", label: "#" },
    { id: "client", label: "CLIENT ON" },
    { id: "appointment", label: "APPOINTMENT ON" },
    { id: "booking", label: "BOOKING DETAILS" },
    { id: "payment", label: "PAYMENT DETAILS" },
    { id: "creadit", label: "CREATED NO" },
    { id: "action", label: "ACTION" },
  ];

  const [check, setCheck] = useState(true);
  //integration
  const appointments = getAllAppointments();
  const appointmentTableData = appointments.data.results.map((item) => {
    return {
      id: item.id,
      name: item.customerId.name,
      customerId: item.customerId.id,
      email: item.customerId.email,
      amount: item.amount,
      date: item.date,
      start_time_range: item.start_time_range,
      end_time_range: item.end_time_range,
      bookings: item.bookings,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      paymentId: item.paymentId,
      notes: item.notes.data.length > 0,
      reschedule: item.reschedule,
    };
  });

  const {
    collectPayment,
    setCollectPayment,
    dynamicModal,
    handleModalClose,
    handleConfirmbtn,
    handleRightbtn,
    handleActionClick,
    sms,
    handleDrawerClose,
  } = useActionHooks({ appointments: appointmentTableData });

  useEffect(() => {
    if (!appointments.loading) {
      setCheck(true);
    }
  }, [appointments.data]);
  return (
    <>
      <div className="min-h-screen ">
        <div className="pt-4 pl-1 ">
          <PageTitle title={"All Appointments"} />
        </div>

        {!appointments.loading && (
          <ManageAllAppointment
            columns={columns}
            approvedBooking={appointmentTableData}
            handleOptions={handleActionClick}
            setQuery={(query: any) => {
              appointments.setparams((old) => ({ ...old, ...query }));
            }}
            setCheck={setCheck}
            check={check}
            key={appointmentTableData.length}
          />
        )}

        {/* pagination */}
        <PaginationFeature
          totalPage={appointments.data.totalPages}
          setPage={appointments.setPage}
        />

        {/* Action Modal  */}
        {dynamicModal.open && (
          <WarningModal
            open={dynamicModal.open}
            updateOpen={handleModalClose}
            title={dynamicModal.title}
            handleLeftbtn={handleConfirmbtn}
            btnfirst={dynamicModal.btnfirst}
            btnSec={dynamicModal.btnsec}
            handleRightbtn={handleRightbtn}
          />
        )}

        {collectPayment.open && (
          <CollectPaymentModal
            open={collectPayment.open}
            setOpen={() =>
              setCollectPayment((old) => ({ ...old, open: false }))
            }
            customerId={collectPayment.customerId}
            appointmentId={collectPayment.appointmentId}
            amount={collectPayment.amount}
            appointmentData={collectPayment.appointmentData}
          />
        )}
      </div>

      <SideDrawer
        open={sms.smsDrawer}
        onClose={handleDrawerClose}
        title="SMS"
        headerHidden={true}
        customWidth={true}
      >
        <ChatFeature appoinment ={sms.smsAppointment} />
      </SideDrawer>
    </>
  );
};

export default AllAppointment;
