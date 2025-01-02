'use client'
import React from 'react';
import useAppointmentFlow from './hooks/useAppointmentFlow';
import { CreateAppointmentUI } from './Component';

const CreateAppointments = () => {
  const {
    wait,
    API_RUN,
    clientInfoData,
    SetClientInfoData,
    appointmentDetails,
    setAppointmentDetails,
    tableselectedData,
    setTableselectedData,
    discount,
    Loading,
    setLoading,
    memberResponse,
    finalResponse,
    Next,
    SetNext,
    errors,
    setErrors,
    appointmentRes,
    setAppointmentRes,
    paymentData,
    setPaymentData,
    find,
    next,
    previewData,
    manageDiscount,
    setManageDiscount
  } = useAppointmentFlow();

  return (
    wait ? <></> : <>
    <div className='min-h-screen '>
      <CreateAppointmentUI
        Next={Next}
        API_RUN={API_RUN}
        Loading={Loading}
        setLoading={setLoading}

        appointmentDetails={appointmentDetails}
        clientInfoData={clientInfoData}
        SetClientInfoData={SetClientInfoData}
        setAppointmentDetails={setAppointmentDetails}
        SetNext={SetNext}
        setTableselectedData={setTableselectedData}
        tableselectedData={tableselectedData}
        discount={discount}
        find={find}
        next={next}
        errors={errors}
        setErrors={setErrors}

        finalResponse={finalResponse}
        setAppointmentRes={setAppointmentRes}

        memberResponse={memberResponse}
        previewData={previewData}

        setPaymentData={setPaymentData}

        manageDiscount={manageDiscount}
        setManageDiscount={setManageDiscount}
      />
      </div>
    </>
  );
};

export default CreateAppointments;
