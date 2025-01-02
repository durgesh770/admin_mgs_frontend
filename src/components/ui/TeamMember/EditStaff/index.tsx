'use client'

import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import DynamicTable from '../../Table';

//hooks
import { updateStaffHours } from '@/hooks/TeamMembers/StaffHours';
import { getServices } from '@/hooks/Services';
import { TeamMembers } from '@/interface/TeamMembers';
import { updateMember } from '@/hooks/TeamMembers';
import { BoxButton } from '../../Button';

interface Service {
    title: string;
    id: string;
}

interface EditStaffProps {
    user: TeamMembers
}

const EditStaff: React.FC<EditStaffProps> = ({ user }) => {
    let id = user.id;
    let services = user.services;
    let onlineBooking = user.staffHours?.onlineBooking;
    let boi = user.description;



    const [tableFormat, setTableFormat] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        onlineBooking: onlineBooking || false,
        description: boi || '',
    });
    const [rows, setRows] = useState<any[]>([]);
    const [loadTable, setLoadTable] = useState(false);

    //hooks
    const handleUpdateMember = updateMember(id);
    const updateHours = updateStaffHours(id)
    const servicesData = getServices(100);

    useEffect(() => {
        if (servicesData.data.length === 0) return;

        // @ts-ignore
        const selected = generateSelectedArray(servicesData.data, services);
        setTableFormat(selected.map((item) => ({ title: item.title })));

        const rowsData = getSelectedIndices(selected);
        setRows(rowsData);

        setLoadTable(true);
    }, [servicesData.data]);

    function generateSelectedArray(data: Service[], defaults: Service[]) {
        return data.map((item) => ({
            title: item.title,
            id: item.id,
            selected: defaults.some((defaultItem) => defaultItem.id === item.id),
        }));
    }

    function getSelectedIndices(selectedArray: { selected: boolean }[]) {
        return selectedArray.map((item, index) => (item.selected ? index : null)).filter((index) => index !== null);
    }

    function getDataByIndices(array: number[]) {
        return array.map((item, index) => servicesData.data[item]);
    }



    const handleSubmit = () => {
        const selectedServices = getDataByIndices(rows).map((item) => item.id);

        if (services.length != rows.length || formData.description != boi) {
            handleUpdateMember.submit({ description: formData.description, services: selectedServices });
        }

        if (formData.onlineBooking != onlineBooking) {
            updateHours.submit({
                onlineBooking: formData.onlineBooking,
                timetable: user.staffHours?.timetable
            });
        }

    };


    const [editData, setEditData] = useState(false);
    useEffect(() => {
        if (!loadTable) return;

        // Check if onlineBooking or description has been modified
        // Check if selected services have been modified
        if (formData.onlineBooking != onlineBooking || formData.description != boi || services.length != rows.length) {
            setEditData(true);
        } else {
            setEditData(false);
        }
    }, [formData, onlineBooking, boi, rows, services]);


    return (
        <div className="cardsCss">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-semibold text-md text-[--brand-color]">
                        Edit Staff
                    </h1>
                </div>
            </div>

            <Grid item xs={6} className="pt-4">
                <h1 className="text-xs font-semibold ">ONLINE BOOKING</h1>
                <div className="mt-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            defaultChecked={onlineBooking}
                            onChange={(e) => setFormData({ ...formData, onlineBooking: e.target.checked })}
                            value=""
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <small className="ml-2 font-semibold">Bookable by Customers Online</small>
                    </label>
                </div>
            </Grid>

            <div className="mb-4">
                <p className="text-xs text-gray-600">
                    When enabled, this staff member will be bookable on all online Booking Channels you have turned on. This will not affect your ability to choose
                    this person when you create an appointment
                </p>
            </div>

            {formData.onlineBooking && <>
                
                    <div className="mb-4">
                        <small className="font-semibold text-md">Services offered during online booking</small>
                        <p className="mt-2 text-xs text-gray-600">
                            Customise which services this staff member will offer when clients book online. All services will still be available to you when you are
                            creating appointments.
                        </p>
                    </div>

                    {loadTable && <DynamicTable columns={[]} defaultRowSelected={rows} data={tableFormat} onRowSelect={setRows} checkbox />}
                </>
            }

            <div className="m-auto mt-4">
                <div className="mb-2">
                    <span className="text-xs font-semibold">Description</span>
                </div>
                <div className="m-auto">
                    <textarea id="w3review" name="w3review" defaultValue={boi}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        style={{ borderRadius: '.3rem', width: '100%' }} 
                        className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                </div>
            </div>

            {editData && <div onClick={handleSubmit}><BoxButton >
                <span className='font-semibold' onClick={handleSubmit}>Update</span>
            </BoxButton></div> }
        </div>
    );
};

export default EditStaff;
