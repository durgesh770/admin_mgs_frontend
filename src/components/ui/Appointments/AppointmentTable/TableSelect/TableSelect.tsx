import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

interface BasicTimePickerprops {
  defaultTime: any;
  setTime?: any;
}

export default function TableSelect({
  defaultTime,
  setTime,
}: BasicTimePickerprops) {
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
      <TimePicker value={value} ampm={false} onChange={handleTimeChange} />
    </LocalizationProvider>
  );
}
