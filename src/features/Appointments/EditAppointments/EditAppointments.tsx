"use client";
// mui
import { CircularProgress, Grid } from "@mui/material";

// component
import AddDiscount from "@/components/ui/Appointments/AddDiscount/AddDiscount";
import ClientInfoFeatures from "../ComponentFeatures/ClientInfoFeatures/ClientInfoFeatures";
import AppointmentDetailsFeatures from "../ComponentFeatures/AppointmentDetailsFeatures/AppointmentDetailsFeatures";
import AppointmentTableFeatures from "../ComponentFeatures/AppointmentTable/AppointmentTable";
import Header from "@/components/ui/Header";

//hooks
import useAppointmentFlow from "../CreateAppointments/hooks/useAppointmentFlow";
import { ErrorRender } from "../CreateAppointments/hooks";
import Button from "@/components/ui/Button";
import { NextAppointmentUI } from "../CreateAppointments/Component";
import { rescheduleAppointment } from "@/hooks/Appointment";

const EditAppointments = ({ appointmentId = "" }) => {
  const {
    wait,
    isUpdate,
    updatedKeys,
    updateNext,

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
    paymentData,
    setPaymentData,
    find,
    next,
    previewData,

    manageDiscount,
    setManageDiscount
  } = useAppointmentFlow(appointmentId);

  //rescheduleAppointmentHook
  const rescheduleAppointmentHook = rescheduleAppointment();


  const handleSubmit = async () => {
    setLoading("submit");

    let body = { ...finalResponse, discount: {} };

    if (manageDiscount.code) {
      body.discount.code = manageDiscount.code;
    }

    if (manageDiscount.custom?.customValue > 0) {
      body.discount.custom = manageDiscount.custom;
    }

    await rescheduleAppointmentHook.submit(appointmentId, body).catch(() => null);
    setLoading("");
  };



  return (
    !wait && (
      <>
       <div className= 'bg-white border border-[--brand-light-gray-color]  p-4 lg:w-fit  m-auto  min-h-screen'>
        <Grid
          sx={{
            width: "46rem",
            margin: "auto",
            // paddingBottom: "50px",
            '@media (max-width: 1060px)': {
              width: "100%",
            },
          }}
        >
            <div hidden={Next}>
            <div className='sticky top-[75px] bg-white z-30 w-full'>
              <Header
                title="Edit Appointment"
                path={'appointments/all-appointment'}
                rightSide={
                  <>
                    <div className="flex justify-between w-full gap-1">
                      {Loading == "find" ? (
                        <CircularProgress />
                      ) : (
                        isUpdate &&
                        updatedKeys.length > 0 && (
                          <Button loading={false} onClick={find} btnType="secondary">
                            Find
                          </Button>
                        )
                      )}
                      {Loading == "next" ? (
                        <CircularProgress />
                      ) : isUpdate ? (
                        updatedKeys.length == 0 ? (
                          <Button  loading={false} btnType="outline" onClick={updateNext}>
                            Next
                          </Button>
                        ) : (
                          API_RUN && (
                            <Button  loading={false} btnType="outline" onClick={next}>
                              Next
                            </Button>
                          )
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                }
              />

              </div>
              {
                clientInfoData?.data && <ClientInfoFeatures
                clientData={{
                  defaultValue: clientInfoData,
                  setValue: SetClientInfoData,
                }}
              />}
              <AppointmentDetailsFeatures
                details={appointmentDetails}
                setDetails={setAppointmentDetails}
              />
              {Next ? (
                <div className="py-2 my-5" />
              ) : (
                <ErrorRender
                  API_RUN={API_RUN}
                  memberResponse={memberResponse}
                  errors={errors}
                />
              )}
              <AppointmentTableFeatures
                tableselectedData={tableselectedData}
                setTableselectedData={(e: any) => {
                  setTableselectedData(e);
                }}
              />
              <AddDiscount data={discount} defaultData={manageDiscount} setData={setManageDiscount} />
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
              />
            )}
          </Grid>
        </div>
      </>
    )
  );
};

export default EditAppointments;
