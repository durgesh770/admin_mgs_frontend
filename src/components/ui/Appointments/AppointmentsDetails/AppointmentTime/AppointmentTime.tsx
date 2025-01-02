import * as React from "react";
// mui
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { makeStyles } from "@mui/styles";

interface appointmentTimeprops {
  defaultTime: string;
  setTime?: any;
}

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      padding: 0,
      color: "blue",
      margin:0,
      width:"5.5rem",
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "&:focus .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "& input": {
        fontSize: "1rem",
        paddingTop: ".5rem",
        paddingRight: 0,
        paddingBottom: ".5rem",
        paddingLeft: ".5rem",
        cursor:"pointer",
        borderRadius:"5px",
      },
    },
  },
});

export default function AppointmentTime({
  defaultTime,
  setTime,
}: appointmentTimeprops) {
  const classes = useStyles();

  const [value, setValue] = React.useState<any>(
    dayjs(`2023-01-01T${defaultTime}`)
  );

  const handleTimeChange = (time: any) => {
    const specificTime = dayjs(time);

    setValue(specificTime);
    setTime(specificTime.format("HH:mm"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        value={value}
        ampm={true}
        className={classes.root}
        onChange={handleTimeChange}
      />
    </LocalizationProvider>
  );
}
