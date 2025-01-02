import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function CalendarHome({ value, setValue }: any) {
  return (
    <>
      <style>{`
       .mui-1u23akw-MuiButtonBase-root-MuiPickersDay-root.Mui-selected {
        background-color: var(--brand-color);
      
    }
    .mui-jgls56-MuiButtonBase-root-MuiPickersDay-root.Mui-selected {
        background-color: var(--brand-color);
    }


    .mui-1u23akw-MuiButtonBase-root-MuiPickersDay-root.Mui-selected:hover {
         will-change: background-color; 
         background-color: var(--brand-color);
            }

            .mui-jgls56-MuiButtonBase-root-MuiPickersDay-root.Mui-selected:hover {
                will-change: background-color;
                background-color: var(--brand-color);
                        }
                        

                
        /* Responsive styles */
        @media (max-width: 400px) {
          .mui-1q04gal-MuiDateCalendar-root{
            width: 200px;; /* Adjust the color for smaller screens */
          }
        }

      `}</style>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
      </LocalizationProvider>
    </>
  );
}
