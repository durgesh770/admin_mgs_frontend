// react
import React from "react";
// mui
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";

// monent
import { useTimeTracker } from "@/context/TimeTrackerContext";

const OnlyTimeTracker = () => {
  const {
    formatTime,
    startTimer,
    time,
    timerRunning,
    stopTimer,
  } = useTimeTracker();

  return (
    <div className=" bg-[#f5f5f5] border border-[--brand-light-gray-color] rounded-lg shadow-sm">
      <div className="flex flex-row justify-between pr-4 pl-2 items-center p-1">
        <div className="border border-gray-300 bg-[--brand-black-color] text-white h-[30px] flex items-center rounded-md p-4">
          <span className=" text-[18px] ">
            {formatTime(time.hours)}:{formatTime(time.minutes)}:
            {formatTime(time.seconds)}
          </span>
        </div>
        <div>
          {timerRunning ? (
            <StopCircleOutlinedIcon
            className="cursor-pointer text-red-500 ml-3 transform scale-125"
            onClick={stopTimer}
          />
          ) : (
            <PlayCircleOutlineIcon
              onClick={startTimer}
              className="text-[--brand-color] cursor-pointer ml-3 transform scale-125 "
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlyTimeTracker;
