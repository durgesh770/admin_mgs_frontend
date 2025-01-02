'use client'

import ServicesTable from '@/features/Services/Table'
import { Grid } from '@mui/material';
import Button from '@/components/ui/Button';
import CreateService from '@/features/Services/CreateServices/CreateService';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { PermissionAccess, SecurePageByPackage } from "@/middleware/PermissionAccess"
import { useState } from 'react';

const Services = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className="bg-[--brand-white-color] border border-[--brand-light-gray-color] m-auto xl:w-[45vw] min-h-screen md:p-[15px] p-[10px]">
                  <div className='flex flex-row justify-between items-center mb-6 mt-8'> 
                        <h1 className=" font-bold  md:text-[1.7rem] text-[1.5rem]">
                            Services
                        </h1>

                        <PermissionAccess requiredPermissions={["create_service"]}>

                            <div className='md:block hidden'>
                                <Button btnType={"secondary"} onClick={() => setOpen(true)} >Create Services</Button>
                            </div>
                            <div className='block md:hidden'>
                                <BorderColorIcon onClick={() => setOpen(true)} />
                            </div>
                        </PermissionAccess>
                        </div>
                   
                    <ServicesTable />
                    <CreateService setOpen={setOpen} open={open} />
            </div>
        </>
    );
}

export default SecurePageByPackage(Services, ["view_service"])
