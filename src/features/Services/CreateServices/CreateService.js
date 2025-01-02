"use client";
import { useState } from "react";
// mui
import { Button, Divider, Grid } from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
// component
import Modal from "@/components/ui/Modal";
import ButtonCom from '@/components/ui/Button';
import ServiceForm from "@/features/Services/Form";
// hook
import { createService } from "@/hooks/Services";

const CreateService = ({ setOpen, open }) => {
    // form data
    const [data, setData] = useState();

    // integration
    const serviceHook = createService();

    const handleSubmit = () => {
        let { serviceTime, formData, switchValue, isComplex } = data;

        const totalMinutes = (parseInt(serviceTime.hours, 10) * 60) + parseInt(serviceTime.minutes, 10);
        let body = {
            ...formData,
            duration: totalMinutes,
            active: switchValue,
            isComplex
        };

        serviceHook.submit(body);
    };

    return (
        <Modal customOpen={open} customClose={setOpen}>
            <div className="bg-[--brand-pastel-color] border border-gray-300 rounded-2xl">
                <div className="flex flex-row items-center justify-between">
                    <Grid>
                        <Button onClick={() => setOpen(false)}>
                            <ClearOutlinedIcon />
                        </Button>
                    </Grid>
                    <h1 className="text-2xl font-semibold text-[--brand-color] p-4">
                        Create Services
                    </h1>
                    <div></div>
                </div>
                <Divider />
                <div className="max-h-[90vh] overflow-y-auto">
                    <ServiceForm setData={setData} />
                    <Grid className=" flex flex-row  justify-end items-center">
                        <Grid>
                            <ButtonCom
                                loading={serviceHook.loading}
                                btnType="secondary"
                                onClick={handleSubmit}
                            >
                                Save
                            </ButtonCom>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Modal>
    );
};

export default CreateService;
