// react 
import React, { useEffect, useState } from "react";
// component
import Input from "@/components/ui/Input";
import SelectComponent from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
// mui
import { Divider, Grid, Typography } from "@mui/material";
import { convertToHoursAndMinutes, generateHoursArray } from "@/utils/functions";


const ServiceForm = ({ defaultData = {}, setData }) => {
  const [switchValue, setSwitchValue] = useState(Boolean(defaultData.active));
  const [overlap, setOverlap] = useState(false);
  const option = generateHoursArray(23);

  const optionMinutes = [
    {
      label: "0 Minutes",
      value: 0,
    },
    {
      label: "15 Minutes",
      value: 15,
    },
    {
      label: "30 Minutes",
      value: 30,
    },
    {
      label: "45 Minutes",
      value: 45,
    },
  ];

  //form data
  const [formData, setFormData] = useState({
    title: defaultData.title || "",
    price: defaultData.price || "",
    description: defaultData.description || "",
  });

  const [serviceTime, setServiceTime] = useState(
    defaultData.duration
      ? convertToHoursAndMinutes(defaultData.duration)
      : {
        hours: option[0].value,
        minutes: optionMinutes[0].value,
      }
  );

  //send data
  useEffect(() => {
    setData({
      serviceTime,
      formData,
      switchValue,
      isComplex: overlap
    });
  }, [serviceTime, formData, switchValue, overlap]);

  console.log("overlap", overlap)

  return (
    <>
      <Grid
        className="p-4"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: "1rem",
          "@media (max-width: 430px)": {
            margin: "auto",
            display: "block",
          },
        }}
      >
        <Grid
          sx={{
            width: "100%",
            "@media (max-width: 430px)": {
              marginBottom: "5px",
            },
          }}
        >
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            label="Title"
            borderline={true}
            placeholder="Title"
          />
        </Grid>
        <Grid sx={{ width: "100%" }}>
          <Input
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            label="Price"
            borderline={true}
            placeholder="Price"
            type="number"
          />
        </Grid>
      </Grid>

      <Grid
        className="px-2 py-2 StaffMemberCss"
        sx={{
          width: "100%",
          gap: "1rem",
          "@media (max-width: 800px)": {
            display: "block",
          },
        }}
      >
        <SelectComponent
          label={"Hours"}
          options={option}
          value={serviceTime.hours}
          onChange={(e) => {
            setServiceTime({ ...serviceTime, hours: e });
          }}
        />
        <SelectComponent
          label={"Minutes"}
          options={optionMinutes}
          value={serviceTime.minutes}
          onChange={(e) => {
            setServiceTime({ ...serviceTime, minutes: e });
          }}
        />
      </Grid>

      <Grid
        className="px-2 py-2 StaffMemberCss"
        sx={{
          width: "100%",
          gap: "1rem",
          "@media (max-width: 800px)": {
            display: "block",
          },
        }}
      >
        <div className="w-full input-container">
          <label className="input-label">Description</label>
          <textarea
            className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
      </Grid>

      <Grid
        className="px-4 py-4 StaffMemberCss"
        sx={{
          width: "100%",
          "@media (max-width: 800px)": {
            display: "block",
          },
        }}
      >
        <div className="w-full mb-5">
          <Divider />

          <Grid
            className="py-2"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "auto",
            }}
          >
            <Grid>
              <Typography className="text-[--brand-color] pb-2">Active</Typography>
              <Typography>
                Choose whether this service is active or inactive for booking
                online by the customer
              </Typography>
            </Grid>

            <Grid><Switch switchValue={switchValue} setSwitchValue={setSwitchValue} /></Grid>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "auto",
            }}
          >
            <Grid>
              <Typography className="text-[--brand-color] pb-2">Overlapping service availability</Typography>
              <Typography>
                Choose the Overlapping service availability
              </Typography>
            </Grid>

            <Grid><Switch switchValue={overlap} setSwitchValue={setOverlap} /> </Grid>
          </Grid>

          <Divider />
        </div>
      </Grid>
    </>
  );
};

export default ServiceForm;
