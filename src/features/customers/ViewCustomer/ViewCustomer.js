'use client'

// mui 
import { Grid } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
// react 
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// component
import PersonalDetails from '@/components/ui/Customers/PersonalDetails/PersonalDetails';
import UpComingAppointments from '@/components/ui/Customers/Appointments/Appointments';
import PastAppointments from '@/components/ui/Customers/PastAppointments/PastAppointments';
import Notes from '@/components/ui/Customers/Notes/Notes';
import BuyerSummary from '@/components/ui/Customers/BuyerSummary/BuyerSummary';
import SideDrawer from '@/components/ui/SideDrawer';
import Activity from '@/components/ui/Customers/Activity/Activity';
import FileCard from '@/components/ui/Customers/FileCard/FileCard';
// hooks
import { removeQuery } from '@/utils/tools';
import { getSingleCustomer } from '@/hooks/Customer';

const ViewCustomer = ({ customerId, data }) => {
    let customer = data.customer;
    let buyerSummary = data.buyerSummary;
    let router = useRouter();

    // state
    const [viewCustomer, setviewCustomer] = useState(false);

    // handle close
    const handleClose = () => {
        removeQuery(router, ["customerId"]);
    }

    const handleRelocate = () => {
        handleClose()
        router.push(`customers/intakeform/${customerId}`)
    }

    // handle side effect
    useEffect(() => {
        setviewCustomer(Boolean(customerId))
    }, [customerId]);

    return (
        <>
            <SideDrawer open={viewCustomer} onClose={handleClose} title={customer?.name} headerHidden={false} >
                <div className=' sticky top-0 z-30 w-full grid grid-cols-3 items-center justify-between bg-white py-3 px-4 '  >
                    <Grid sx={{ cursor: "pointer" }} onClick={handleClose}> <CloseIcon /></Grid>
                    <div>{customer?.name}</div>
                </div>

                <Grid
                    sx={{
                        position: "relative",
                        overflow: "auto",
                        marginBottom: "36px"
                    }}
                    className='px-3'>
                    {/* personal details card */}
                    <PersonalDetails data={customer} handleRelocate={handleRelocate} />

                    {/* personal details card */}
                    <UpComingAppointments customerId={customerId} />

                    {/* personal details card */}
                    <PastAppointments customerId={customerId} />

                    {/* personal details card */}
                    <Notes data={customer} />

                    {/* personal details card */}
                    <BuyerSummary data={buyerSummary} />

                    <Activity customerId={customerId} />

                    <FileCard customerId={customerId} />
                </Grid>
            </SideDrawer>
        </>
    )
}

export default function GetData({ customerId }) {
    if (!customerId) return <></>;

    let customerDetail = getSingleCustomer(customerId);
    return !customerDetail.loading && customerDetail.data != null ? <ViewCustomer customerId={customerId} data={customerDetail.data} /> : ''
}

