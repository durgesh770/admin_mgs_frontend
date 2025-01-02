// @ts-nocheck


import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
    Button,
    DialogTitle,
    Grid,
    Divider,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import {
    LocalizationProvider
} from '@mui/x-date-pickers/LocalizationProvider';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers';
import Modal from '@/components/ui/Modal';
import DynamicTable from '@/components/ui/Table';
import ButtonCom from '@/components/ui/Button';

import { TeamMembers, Timetable, TimeSlot as TS } from '@/interface/TeamMembers';

import { convertTimes } from './features';

interface TimeSlot {
    start_time: dayjs.Dayjs;
    end_time: dayjs.Dayjs;
}

interface DayAvailability {
    available: boolean;
    timeslot: TimeSlot[];
}

interface StaffMemberModalProps {
    user: TeamMembers;
    setTimeTableData?: (e: any) => any;
    setOnlineBooking?: (e: any) => any;
    submit?: (e: any) => any;
}

const StaffMemberModal: React.FC<StaffMemberModalProps> = ({ user, setTimeTableData, setOnlineBooking, submit }) => {
    let defaultData: Record<string, any> = user.staffHours?.timetable || {};


    type ValidDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

    const initTime = (defaultTime?: string) => {
        const start_time = defaultTime ? dayjs(defaultTime) : dayjs().set('hour', 12).set('minute', 0).set('second', 0).set('millisecond', 0);
        const end_time = start_time.clone().add(1, 'hour');
        return { start_time, end_time };
    };

    const [open, setOpen] = useState(false);
    const [days, setDays] = useState<{ [day in ValidDay]: DayAvailability }>({
        monday: { available: false, timeslot: [] },
        tuesday: { available: false, timeslot: [] },
        wednesday: { available: false, timeslot: [] },
        thursday: { available: false, timeslot: [] },
        friday: { available: false, timeslot: [] },
        saturday: { available: false, timeslot: [] },
        sunday: { available: false, timeslot: [] },
    });

    const convertToRealTime = (timeInNumber: number) => {
        const timeString = timeInNumber.toString().padStart(4, '0');
        const hours = parseInt(timeString.slice(0, 2));
        const minutes = parseInt(timeString.slice(2));
        const time = dayjs().set('hour', hours).set('minute', minutes);
        return time;
    };
    useEffect(() => {
        if (defaultData) {
            const updatedDays: any = { ...days };

            for (let day in updatedDays) {
                if (defaultData.hasOwnProperty(day) && defaultData[day] && defaultData[day]?.length > 0) {
                    updatedDays[day].available = true;
                    updatedDays[day].timeslot = defaultData[day].map((slot: any) => ({
                        start_time: convertToRealTime(slot.start_time),
                        end_time: convertToRealTime(slot.end_time),
                    }));
                }
            }

            setDays(updatedDays);
        }
    }, [defaultData]);


    const handleDayCheck = (day: ValidDay) => {
        setDays((prevDays) => {
            const old = prevDays[day];
            const available = !old.available;
            let timeslot = old.timeslot;

            if (timeslot.length === 0 && available) {
                const oldTimeSlot = defaultData[day];

                if (oldTimeSlot) {
                    if (oldTimeSlot?.length > 0) {
                        timeslot = oldTimeSlot.map((slot: any) => ({
                            start_time: convertToRealTime(slot.start_time),
                            end_time: convertToRealTime(slot.end_time),
                        }));
                    } else {
                        const newTimeSlot = initTime(oldTimeSlot[oldTimeSlot.length - 1]?.end_time);
                        timeslot.push(newTimeSlot);
                    }
                } else {
                    const newTimeSlot = initTime();
                    timeslot.push(newTimeSlot);
                }
            }

            if (!available) {
                timeslot = [];
            }

            const item = {
                [day]: {
                    ...old,
                    available,
                    timeslot,
                },
            };

            return { ...prevDays, ...item };
        });
    };

    const addTimeSlot = (day: ValidDay) => {
        setDays((prevDays) => {
            const oldTimeSlot = prevDays[day].timeslot;
            const newTimeSlot = initTime(String(oldTimeSlot[oldTimeSlot.length - 1]?.end_time));

            return {
                ...prevDays,
                [day]: {
                    available: true,
                    timeslot: [...prevDays[day].timeslot, newTimeSlot],
                },
            };
        });
    };

    const removeTimeSlot = (day: ValidDay, index: number) => {
        setDays((prevDays) => {
            let timeslot = prevDays[day].timeslot.filter((_, i) => i !== index);

            return {
                ...prevDays,
                [day]: {
                    available: timeslot.length != 0,
                    timeslot: timeslot,
                },
            };
        });

    };

    const handleTextFieldChange = (day: ValidDay, index: number, field: 'start_time' | 'end_time', newValue: any) => {
        setDays((prevDays) => ({
            ...prevDays,
            [day]: {
                ...prevDays[day],
                timeslot: prevDays[day].timeslot.map((t, i) =>
                    i === index ? { ...t, [field]: newValue } : t
                ),
            },
        }));
    };

    const tableFormat: { title: { bold: boolean; type: 'custom'; value: React.ReactNode } }[] = Object.keys(days).map((day) => {
        return {
            title: {
                bold: true,
                type: "custom",
                value: (
                    <Grid key={day} className='StaffMemberCss' sx={{ gap: '60px' }}>
                        <FormControlLabel
                            control={<Checkbox checked={days[day].available} />}
                            label={String(day).toUpperCase()}
                            onChange={() => handleDayCheck(day)}
                        />
                        {days[day].available && (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Grid sx={{ width: '15rem', alignItems: 'center' }}>
                                    {days[day].timeslot.map((slot, index) => (
                                        <Grid key={index} className='mt-2 StaffMemberCss' sx={{ gap: '10px' }}>
                                            <TimeField
                                                value={slot.start_time}
                                                onChange={(newValue) => handleTextFieldChange(day, index, 'start_time', newValue)}
                                                format="HH:mm"
                                                size="small"
                                            />
                                            <TimeField
                                                value={slot.end_time}
                                                onChange={(newValue) => handleTextFieldChange(day, index, 'end_time', newValue)}
                                                format="HH:mm"
                                                size="small"
                                            />
                                            <CloseIcon
                                                sx={{ color: '#D1D6DB', cursor: 'pointer' }}
                                                onClick={() => removeTimeSlot(day, index)}
                                            />
                                            {index === days[day].timeslot.length - 1 ? (
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <AddIcon
                                                        sx={{ color: '#D1D6DB', cursor: 'pointer' }}
                                                        onClick={() => addTimeSlot(day)}
                                                    />
                                                </div>
                                            ) : (
                                                <Grid sx={{ width: "4rem" }} />
                                            )}
                                        </Grid>
                                    ))}
                                </Grid>
                            </LocalizationProvider>
                        )}
                    </Grid>
                ),
            },
        };
    });

    const handleChangeOpen = () => {
        setOpen(false);
    };


    //handle data pass outside
    const handleOnlineBooking = (booking: boolean) => {
        setOnlineBooking && setOnlineBooking(booking);
    }

    useEffect(() => {
        const convertTimeTableDataIntoApiFormat = convertTimes(days);
        setTimeTableData && setTimeTableData(convertTimeTableDataIntoApiFormat);
    }, [days])

    return (
        <Modal customOpen={open} customClose={setOpen} target={<span >Manage Team Hours</span>} >
            <Grid className='ModalbgCss'>
                <Grid alignItems="center" sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Grid>
                        <Button onClick={handleChangeOpen}>
                            <ClearOutlinedIcon />
                        </Button>
                    </Grid>
                    <DialogTitle
                        sx={{
                            textAlign: 'center',
                            fontWeight: 600,
                            float: "center",
                            paddingLeft: "60px",
                            '@media (max-width: 600px)': {
                                paddingLeft: '10px',
                            },
                            '@media (max-width: 400px)': {
                                paddingLeft: '10px',
                                fontSize: "1rem",
                            }
                        }}>
                        Manage Location for {user.name}
                    </DialogTitle>
                </Grid>

                <Divider />

                <Grid className='px-3 py-4 pt-3'>
                    <Grid className='mb-2' >
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={user.staffHours?.onlineBooking} value="" className="sr-only peer" onChange={(e) => handleOnlineBooking(e.target.checked)} />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[--brand-white-color] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <small className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">my girl souz</small>
                        </label>
                    </Grid>
                    <Grid
                        sx={{
                            height: "25rem",
                            overflow: "auto",
                            margin: "auto",
                            '@media (min-width: 600px)': {
                                width: '32rem'
                            },
                            '@media (max-width: 600px)': {
                                width: '24rem'
                            },
                            '@media (max-width: 500px)': {
                                width: '20rem',
                                height: "20rem",
                            },
                            '@media (max-width: 400px)': {
                                width: '16.5rem',
                            },
                        }}
                    >
                        <DynamicTable columns={[]} data={tableFormat} />
                    </Grid>
                </Grid>

                <Divider />

                <Grid className='px-2 py-2 StaffMemberCss'>
                    <Grid>
                        {/* <ButtonCom btnType='delete'>Delete</ButtonCom> */}
                    </Grid>

                    <Grid>
                        <ButtonCom btnType='secondary' onClick={submit}>Save</ButtonCom>
                    </Grid>
                </Grid>

            </Grid>
        </Modal>
    );
};

export default StaffMemberModal;
