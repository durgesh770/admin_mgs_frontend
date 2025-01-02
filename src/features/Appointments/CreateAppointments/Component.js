// UIComponents.js
import React from 'react';
import { CircularProgress, Grid } from '@mui/material';
import AddDiscount from '@/components/ui/Appointments/AddDiscount/AddDiscount';
import ButtonCom from '@/components/ui/Button';
import { ErrorRender, createAppointment } from './hooks';
import AppointmentTableFeatures from '../ComponentFeatures/AppointmentTable/AppointmentTable';
import ClientInfoFeatures from '../ComponentFeatures/ClientInfoFeatures/ClientInfoFeatures';
import AppointmentDetailsFeatures from '../ComponentFeatures/AppointmentDetailsFeatures/AppointmentDetailsFeatures';
import ConfirmAppointment from '../ConfirmAppointment/ConfirmAppointment';
import Header from '@/components/ui/Header';


export const NextAppointmentUI = ({
  API_RUN,
  memberResponse,
  errors,
  tableselectedData,
  setTableselectedData,
  discount,
  findLoading,
  nextLoading,
  submitLoading,
  find,
  next,
  setNext,
  setErrors,
  previewData,
  setPaymentData,
  handleSubmit,
  takePayment = false
}) => {
  return (
    <Grid
      sx={{
        width: "46rem",
        margin: "auto",
        '@media (max-width: 1060px)': {
          width: "100%",
        },
      }}
    >
      <div className="w-fit">
        {findLoading ? <CircularProgress size={20} /> : <ButtonCom btnType="outline" onClick={() => setNext(false)}>Back</ButtonCom>}
      </div>

      <div >
        <ConfirmAppointment data={previewData} setPaymentData={setPaymentData} takePayment={takePayment} />
        <ErrorRender API_RUN={API_RUN} memberResponse={memberResponse} errors={errors} />
      </div>

      {submitLoading ? <CircularProgress size={20} /> : <ButtonCom btnType='secondary' onClick={handleSubmit}>Submit</ButtonCom>}
    </Grid>
  );
};

export const CreateAppointmentUI = ({
  Next,
  API_RUN,
  Loading,
  setLoading,
  appointmentDetails,
  clientInfoData,
  SetClientInfoData,
  setAppointmentDetails,
  SetNext,
  setTableselectedData,
  tableselectedData,
  discount,
  find,
  next,
  errors, setErrors,
  memberResponse,
  setAppointmentRes,
  finalResponse,
  previewData,
  setPaymentData,

  manageDiscount,
  setManageDiscount
}) => {

  const handleSubmit = () => {
    const body = { ...finalResponse, discount: {} };

    if (manageDiscount.code) {
      body.discount.code = manageDiscount.code;
    }

    if (manageDiscount.custom?.customValue > 0) {
      body.discount.custom = manageDiscount.custom;
    }

    createAppointment(body, setErrors, setLoading, setAppointmentRes);
  };


  return (
    <>
      <div className='bg-white border border-[--brand-light-gray-color] p-4 lg:w-fit  m-auto  min-h-screen'>
        <Grid
          sx={{
            width: "46rem",
            margin: "auto",
            '@media (max-width: 1060px)': {
              width: "100%",
            },
          }}
        >
          <div hidden={Next}>
            <div className='sticky top-[75px] bg-white z-30 w-full'>
              <Header
                title={'Create Appointments'}
                path={'appointments/all-appointment'}
                rightSide={<>
                  <div className='flex justify-between w-full gap-1' >
                    {Loading == "find" ? <CircularProgress size={16} /> : <ButtonCom onClick={find} btnType="secondary" >Find</ButtonCom>}
                    {Loading == "next" ? <CircularProgress size={16} /> : API_RUN && <ButtonCom btnType="outline" onClick={next}>Next</ButtonCom>}
                  </div>
                </>}
              />
            </div>

            <ClientInfoFeatures clientData={{ defaultValue: clientInfoData, setValue: SetClientInfoData }} />
            <AppointmentDetailsFeatures details={appointmentDetails} setDetails={setAppointmentDetails} />
            {Next ? <div className='py-2 my-5' /> : <ErrorRender API_RUN={API_RUN} memberResponse={memberResponse} errors={errors} />}
            <AppointmentTableFeatures
              tableselectedData={tableselectedData}
              setTableselectedData={(e) => {
                setTableselectedData(e);
              }}
            />
            <AddDiscount data={discount} setData={setManageDiscount} />
          </div>


          {Next && (
            <NextAppointmentUI
              API_RUN={API_RUN}
              memberResponse={memberResponse}
              errors={errors}
              tableselectedData={tableselectedData}
              setTableselectedData={setTableselectedData}
              discount={discount}
              findLoading={Loading == "find"}
              nextLoading={Loading == "next"}
              submitLoading={Loading == "submit"}
              find={find}
              next={next}
              setNext={SetNext}
              setErrors={setErrors}
              previewData={previewData}
              setPaymentData={setPaymentData}
              handleSubmit={handleSubmit}
              takePayment
            />
          )}
        </Grid>
      </div>
    </>
  );
};
