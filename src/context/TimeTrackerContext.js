'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSnackbar } from './GlobalContext';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import { CalculateDuration } from '@/utils/functions';
import { convertStringTimeToNumber } from '@/utils/tools';
const TimeContext = createContext();

export const useTimeTracker = () => {
    return useContext(TimeContext);
};

export const TimeProvider = ({ children }) => {
    const searchParams = useSearchParams();

    const timeTracker = searchParams.get("timeTracker");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        if (timeTracker) setIsDrawerOpen(true);
    }, [timeTracker]);

    // state
    const existingSelect = localStorage.getItem("timeTrackerSelect");
    const [select, setSelect] = useState(
        existingSelect ? existingSelect : ""
    );

    const [store, setStore] = useState({
        startTime: "",
        endTime: "",
    });
    let alert = useSnackbar()

    // time tracker Implementation 
    const [time, setTime] = useState(() => {
        const storedTime = localStorage.getItem("time");
        return storedTime
            ? JSON.parse(storedTime)
            : { hours: 0, minutes: 0, seconds: 0 };
    });

    const [timerRunning, setTimerRunning] = useState(() => {
        const runningFlag = localStorage.getItem("timerRunning");
        return runningFlag ? JSON.parse(runningFlag) : false;
    });

    const completedTimeInlocalStrorage = JSON.parse(localStorage.getItem('completedTime')) || {};
    const [completedTime, setCompletedTime] = useState(completedTimeInlocalStrorage);

    const addCompletedAppointment = (id, startTime) => {
        // Check if the appointment ID exists in the completedTime object
        if (completedTime[id]) {
            // If the ID exists, push the new appointment object into the array
            const updatedData = {
                ...completedTime,
                [id]: [
                    ...completedTime[id],
                    { start_time: startTime, end_time: moment().format("HH:mm:ss"), duration: CalculateDuration(convertStringTimeToNumber(moment(startTime, "HH:mm:ss").format("HH:mm")), convertStringTimeToNumber(moment().format("HH:mm"))) }]
            };
            setCompletedTime(updatedData);
        } else {
            // If the ID doesn't exist, create a new array with the appointment object
            const updatedData = {
                ...completedTime,
                [id]: [{ start_time: startTime, end_time: moment().format("HH:mm:ss"), duration: CalculateDuration(convertStringTimeToNumber(moment(startTime, "HH:mm:ss").format("HH:mm")), convertStringTimeToNumber(moment().format("HH:mm"))) }]
            };
            setCompletedTime(updatedData);
        }
    };

    useEffect(() => {
        localStorage.setItem('completedTime', JSON.stringify(completedTime));
    }, [completedTime])

    // use store time interval 
    let id;

    useEffect(() => {
        if (!timerRunning) {
            localStorage.removeItem("time");
            return;
        }

        const startTime = moment(localStorage.getItem("startTime"), "HH:mm:ss");

        if (timerRunning) {
            const currentTime = moment();
            let gapTimeInSeconds = currentTime.diff(startTime, "seconds");

            // Convert the difference from seconds to "HH:MM:SS" format
            const gapTimeFormatted = moment.utc(gapTimeInSeconds * 1000).format("HH:mm:ss");

            // Update the state with the gap time
            setTime({
                hours: parseInt(gapTimeFormatted.split(':')[0]),
                minutes: parseInt(gapTimeFormatted.split(':')[1]),
                seconds: parseInt(gapTimeFormatted.split(':')[2])
            });
        }
    }, []);

    useEffect(() => {
        if (timerRunning) {
            id = setInterval(() => {
                setTime((prevTime) => {
                    const newSeconds = prevTime.seconds + 1;
                    const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60);
                    const newHours = prevTime.hours + Math.floor(newMinutes / 60);

                    const check = localStorage.getItem("timerRunning");
                    if (JSON.parse(check)) {
                        localStorage.setItem(
                            "time",
                            JSON.stringify({
                                hours: newHours,
                                minutes: newMinutes % 60,
                                seconds: newSeconds % 60,
                            })
                        );
                    } else {
                        clearInterval(id);
                    }

                    return {
                        hours: newHours,
                        minutes: newMinutes % 60,
                        seconds: newSeconds % 60,
                    };
                });
            }, 1000);
        }

        return () => {
            clearInterval(id);
        };
    }, [timerRunning]);

    // start time button
    const startTimer = () => {
        if (!select.trim()) {
            setIsDrawerOpen(true)
            alert.SnackbarHandler(true, "error", "Customer is Required");
            return;
        }

        setStore({
            startTime: moment().format("HH:mm:ss"),
            endTime: "",
        });
        setTimerRunning(true);
        localStorage.setItem("timerRunning", "true");
        localStorage.setItem("startTime", moment().format("HH:mm:ss"));
    };


    // handle stop timer button
    const stopTimer = () => {
        clearInterval(id);
        setTimerRunning(false);
        localStorage.setItem("timerRunning", "false");
        const getStartTime = localStorage.getItem("startTime");
        const startTime = moment(getStartTime, "HH:mm:ss");
        const currentTime = moment();

        // Calculate the difference between current time and start time
        const duration = moment.duration(currentTime.diff(startTime));

        // Add the duration to the start time to get the end time
        const endTime = startTime.clone().add(duration);
        const formattedEndTime = endTime.format("HH:mm:ss");

        setStore((prev) => ({
            ...prev,
            endTime: formattedEndTime,
        }));

        addCompletedAppointment(existingSelect, getStartTime)

        setTime({ hours: 0, minutes: 0, seconds: 0 });
        localStorage.removeItem("time");
        localStorage.removeItem("timeTrackerSelect");
        setIsDrawerOpen(true)
        setSelect('')
        localStorage.removeItem("startTime");
    };

    // formate time
    const formatTime = (time) => {
        return time.toString().padStart(2, "0");
    };

    const value = {
        setSelect,
        store,
        setStore,
        select,
        formatTime,
        startTimer,
        stopTimer,
        time,
        timerRunning,
        isDrawerOpen,
        setIsDrawerOpen,
        completedTime,
        setCompletedTime
    };
    return (
        <TimeContext.Provider value={value}>
            {children}
        </TimeContext.Provider>
    );
};