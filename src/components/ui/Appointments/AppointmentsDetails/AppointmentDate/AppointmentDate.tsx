// mui
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { makeStyles } from "@mui/styles";
// react
import { useEffect, useState } from "react";

interface AppointmentDateprops {
  date: any;
  setValue?: any;
}

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      padding: 0,
      color: "blue",
      margin: 0,
      width: "7rem",
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
        cursor: "pointer",
        borderRadius: "5px",
      },
    },
  },
});

export default function AppointmentDate({
  date,
  setValue,
}: AppointmentDateprops) {
  // styles
  const classes = useStyles();
  // state to get date
  const [selectedDate, setSelectedDate] = useState(dayjs(date));

  // show existing date
  useEffect(() => {
    if (date != undefined && date) {
      setSelectedDate(dayjs(date));
    }
  }, [date]);

  const handleDateChange = (newDate: any) => {
    setSelectedDate(newDate);
    setValue && setValue(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        value={selectedDate}
        onChange={handleDateChange}
        className={classes.root}
        format={"DD/MM/YYYY"}
      />
    </LocalizationProvider>
  );
}
