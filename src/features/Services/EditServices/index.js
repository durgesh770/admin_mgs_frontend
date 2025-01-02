"use client"
import Modal from "@/components/ui/Modal"
import { useState } from "react"
import ButtonCom from '../../../components/ui/Button'
import ServiceForm from "@/features/Services/Form"
import { deleteService, updateService } from "@/hooks/Services";
import { PermissionAccess } from "@/middleware/PermissionAccess"
import { Button, Divider, Grid, Typography } from "@mui/material"
// mui
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const EditService = ({ defaultData }) => {
    const [open, setOpen] = useState(true)
    const [data, setData] = useState();

    //integration
    const serviceHook = updateService(defaultData.id);
    const deleteHook = deleteService(defaultData.id);

    const handleSubmit = () => {
        let { serviceTime, formData, switchValue } = data;
        const totalMinutes = (parseInt(serviceTime.hours, 10) * 60) + parseInt(serviceTime.minutes, 10);
        let body = {
            ...formData,
            duration: totalMinutes,
            active: switchValue,
            isComplex:true
        };
        serviceHook.submit(body);
    }

    return (
        <>
            <Modal customOpen={open} customClose={setOpen} >
                <div className="bg-[--brand-pastel-color] border border-gray-300 rounded-xl  ">
                    <div className="flex flex-row items-center justify-between">
                        <Grid><Button onClick={()=>setOpen(false)} ><ClearOutlinedIcon /></Button></Grid>
                        <h1 class="text-2xl font-semibold text-[--brand-color] p-4">Edit Services</h1>
                        <div>
                        </div>
                    </div>
                    <Divider />
                    <div className="max-h-[90vh] overflow-y-auto">
                        <ServiceForm
                            defaultData={defaultData}
                            setData={setData}
                        />

                        <Grid className="StaffMemberCss m-3">
                            <PermissionAccess requiredPermissions={["delete_service"]}>
                                <Grid>
                                    <ButtonCom btnType={'delete'} onClick={() => deleteHook.submit()}>Delete</ButtonCom>
                                </Grid>
                            </PermissionAccess>

                            <Grid>
                                <ButtonCom loading={serviceHook.loading} btnType={'secondary'} onClick={handleSubmit} >Save</ButtonCom>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default EditService