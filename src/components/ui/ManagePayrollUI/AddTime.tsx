//react
import React from "react";
// compoment
import Input from "@/components/ui/Input";
import AppointmentTime from "@/components/ui/Appointments/AppointmentsDetails/AppointmentTime/AppointmentTime";
import Button from "@/components/ui/Button";
//mui
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

//utils
import { convertStringTimeToNumber } from "@/utils/tools";
import { CalculateDuration } from "@/utils/functions";

export const AddTime = ({
  setFields,
  fields,
  handleSubmitbtn,
  loading,
  activebtn,
}: any) => {
  const handleTimeChange = (
    index: number,
    time: string,
    isStartTime: boolean
  ) => {
    setFields((prevFields: any) => {
      const updatedFields = [...prevFields];
      if (isStartTime) {
        const startTimeNumeric = convertStringTimeToNumber(time);
        updatedFields[index] = {
          ...updatedFields[index],
          startTime: startTimeNumeric,
          duration: CalculateDuration(
            startTimeNumeric,
            updatedFields[index].endTime
          ),
        };
      } else {
        const endTimeNumeric = convertStringTimeToNumber(time);
        updatedFields[index] = {
          ...updatedFields[index],
          endTime: endTimeNumeric,
          duration: CalculateDuration(
            updatedFields[index].startTime,
            endTimeNumeric
          ),
        };
      }
      return updatedFields;
    });
  };

  const handleWorkTypeChange = (index: number, value: string) => {
    setFields((prevFields: any) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = { ...updatedFields[index], workedType: value };
      return updatedFields;
    });
  };

  const handleReferenceChange = (index: number, value: string) => {
    setFields((prevFields: any) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = { ...updatedFields[index], reference: value };
      return updatedFields;
    });
  };

  const handleAddField = () => {
    const lastField = fields[fields.length - 1];
    const newEndTime = lastField.endTime + 100;

    setFields((prevFields: any) => [
      ...prevFields,
      {
        startTime: lastField.endTime,
        endTime: newEndTime,
        workedType: "Appointment",
        reference: "",
        duration: 60,
      },
    ]);
  };

  const handleRemoveField = (index: number) => {
    if (fields.length == 1) {
      return;
    }
    setFields((prevFields: any) => {
      const updatedFields = [...prevFields];
      updatedFields.splice(index, 1);
      return updatedFields;
    });
  };

  return (
    <>
      {fields.map((field: any, index: any) => (
        <div key={index}>
          <div className="bg-[--brand-white-color] border border-[--brand-light-gray-color]  md:p-5 p-3 lg:w-fit  m-auto h-fit w-full mt-5">
            {activebtn && (
              <div className="flex flex-row justify-end gap-2">
                <CloseIcon
                  sx={{ color: "#D1D6DB", cursor: "pointer" }}
                  onClick={() => handleRemoveField(index)}
                />
                {index === fields.length - 1 && (
                  <AddIcon
                    sx={{ color: "#D1D6DB", cursor: "pointer" }}
                    onClick={handleAddField}
                  />
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h1 className="input-label ">Start Time</h1>
                <div className="mb-5 border border-gray-400 w-full rounded-md">
                  <AppointmentTime
                    defaultTime={field.startTime}
                    setTime={(time: string) =>
                      handleTimeChange(index, time, true)
                    }
                  />
                </div>
              </div>
              <div>
                <h1 className="input-label ">End Time</h1>
                <div className="flex gap-4">
                  <div className="mb-5 border border-gray-400 w-full rounded-md">
                    <AppointmentTime
                      defaultTime={field.endTime}
                      setTime={(time: string) =>
                        handleTimeChange(index, time, false)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                className={`mb-5 `}
                label="Task"
                borderline={true}
                placeholder="task"
                value={field.workedType}
                onChange={(e) => handleWorkTypeChange(index, e.target.value)}
              />
              <Input
                className={`mb-5 `}
                label="Reference "
                borderline={true}
                placeholder="reference "
                value={field.reference}
                onChange={(e) => handleReferenceChange(index, e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        onClick={handleSubmitbtn}
        loading={!loading}
        isDisable={!loading}
        btnType={"secondary"}
        className="w-full mt-5"
      >
        Submit
      </Button>
    </>
  );
};
