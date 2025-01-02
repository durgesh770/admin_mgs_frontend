// react
import React, { useState } from "react";
// component
import AppointmentTime from "@/components/ui/Appointments/AppointmentsDetails/AppointmentTime/AppointmentTime";
// context
import { useAuth } from "@/context/AuthContext";
// hook
import { useGetTodayAppointment } from "@/hooks/TimeTracker";
// utils
import { convertStringTimeToNumber } from "@/utils/tools";
// moment
import moment from "moment";
import { useTimeTracker } from "@/context/TimeTrackerContext";
import { CalculateDuration } from "@/utils/functions";

const TimeTrackerCardDetails = () => {
  // integration
  const { store, completedTime, setCompletedTime } = useTimeTracker();

  // integration hooks
  const { user } = useAuth();
  const { data } = useGetTodayAppointment(user.id);
  const getStartTime = localStorage.getItem("startTime") || "";

  const [startTime, setStartTime] = useState(getStartTime);
  const [endTime, setEndTime] = useState(store.endTime);

  const endTimeInMinutes = convertStringTimeToNumber(
    moment(endTime, "HH:mm:ss").format("HH:mm")
  );

  const handleDateChange = (id: string, index: number, appointment: any) => {
    setCompletedTime((prevCompletedTime: any) => {
      // Create a copy of the completedTime state
      const updatedCompletedTime = { ...prevCompletedTime };

      // Get the appointment data array for the specified ID
      const appointmentData = updatedCompletedTime[id];

      // Update the start time and duration for the appointment at the specified index
      appointmentData[index].start_time = startTime;

      const newDuration = CalculateDuration(
        convertStringTimeToNumber(
          moment(startTime, "HH:mm:ss").format("HH:mm")
        ),
        convertStringTimeToNumber(
          moment(appointment.end_time, "HH:mm:ss").format("HH:mm")
        )
      );
      
      appointmentData[index].duration = newDuration;

      // Update the state with the modified completedTime object
      return updatedCompletedTime;
    });
  };

  const handleEndDateChange = (id: string, index: number, appointment: any) => {
    setCompletedTime((prevCompletedTime: any) => {
      // Create a copy of the completedTime state
      const updatedCompletedTime = { ...prevCompletedTime };

      // Get the appointment data array for the specified ID
      const appointmentData = updatedCompletedTime[id];

      // Update the start time and duration for the appointment at the specified index
      appointmentData[index].end_time = endTime;

      const newDuration = CalculateDuration(
        convertStringTimeToNumber(
          moment(startTime, "HH:mm:ss").format("HH:mm")
        ),
        endTimeInMinutes
      );
      appointmentData[index].duration = newDuration;

      // Update the state with the modified completedTime object
      return updatedCompletedTime;
    });
  };

  return (
    <>
      {Object.entries(completedTime).map(
        ([appointmentId, appointmentData]: any) => {
          const customer = data.filter(
            (item) => item.customerId.id == appointmentId
          );
          return (
            <div
              key={appointmentId}
              className=" bg-[--brand-white-color] mt-5 h-fit py-2 px-4 shadow-md rounded-md"
            >
              <div>
                <span className=" font-bold text-[18px]">
                  {moment(new Date()).format("DD MMM YYYY")}
                </span>
                <div className="text-[16px] py-2 ">
                  {customer[0]?.customerId.name}
                </div>
                {appointmentData.map((appointment: any, index: any) => (
                  <>
                    <div className=" flex flex-wrap justify-between items-center">
                      <div className=" flex flex-row justify-start items-center">
                        <div
                          onClick={() =>
                            handleDateChange(appointmentId, index, appointment)
                          }
                        >
                          <AppointmentTime
                            defaultTime={moment(
                              appointment.start_time,
                              "HH:mm:ss"
                            ).format("HH:mm")}
                            setTime={setStartTime}
                          />
                        </div>
                        -
                        <div
                          onClick={() =>
                            handleEndDateChange(
                              appointmentId,
                              index,
                              appointment
                            )
                          }
                        >
                          <AppointmentTime
                            defaultTime={moment(
                              appointment.end_time,
                              "HH:mm:ss"
                            ).format("HH:mm")}
                            setTime={setEndTime}
                          />
                        </div>
                      </div>

                      <div key={index}>
                        Duration: {moment.utc(moment(appointment.end_time, 'HH:mm:ss').diff(moment(appointment.start_time, 'HH:mm:ss'))).format('HH:mm:ss')}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          );
        }
      )}
    </>
  );
};

export default TimeTrackerCardDetails;
