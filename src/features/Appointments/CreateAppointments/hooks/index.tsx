//@ts-nocheck

// services.js
import { AvailabilityService, AppointmentService } from '@/services';
import { Alert } from '@mui/material';

export const callAvailabilityService = async (body, setResponse) => {
  try {
    const res = await AvailabilityService.findTeamMemberAvailability(body);

    console.log(" findTeamMemberAvailability ===========>>>> " , res)
    setResponse(res);
    return res;
  } catch (error) {
    console.error("Error calling AvailabilityService:", error);
  }
};

export const createCustomAvailability = async (body) => {
  return await AvailabilityService.createCustomAvailability(body);
};

export const createAppointment = async (finalResponse, setErrors, setLoading,setAppointmentRes) => {
  setLoading("submit");

  try {
    const appointmentRes = await AppointmentService.createAppointment(finalResponse);
    if (!appointmentRes.success) {
      setErrors((old) => [...old, appointmentRes.data.message]);
    }
    if (appointmentRes?.success) {
      setAppointmentRes(appointmentRes.data);
    }
    return appointmentRes;
  } catch (err) {
    setErrors((old) => [...old, err.response.data?.message]);
  } finally {
    setLoading("");
  }
};

const handleSubmit = async () => {
  let res = await createAppointment(finalResponse, setErrors, setLoading);


};
// Component for rendering errors
export const ErrorRender: React.FC<{ API_RUN: boolean; memberResponse: any; errors: string[] }> = ({ API_RUN, memberResponse, errors }) => {
  return (
    <div className='py-2 my-5'>
      <div className="" >
        {memberResponse?.error?.map((err: any) => (
          <h4 key={err.memberId} className="pt-2 text-red-300">
            <Alert severity="warning"> {err.error}</Alert>
          </h4>
        ))}
        {errors.map((err, index) => (
          <h4 key={index} className="pt-2 text-red-300">
            <Alert severity="warning"> {err}</Alert>
          </h4>
        ))}
      </div>
    </div>
  );
};