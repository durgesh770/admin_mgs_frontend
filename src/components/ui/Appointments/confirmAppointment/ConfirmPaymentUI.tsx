import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

import CollectOnlineOrManualPayment from "@/features/Payment/CollectOnlineOrManualPayment"

interface ConfirmPaymentUIprops {
    customerId: string;
    setData?: any;
    amount?: number
}

const ConfirmPaymentUI: React.FC<ConfirmPaymentUIprops> = ({ customerId, setData, amount }) => {
    const [payMethodType, setpayMethodType] = useState("later");


    //Online Payment
    const [onlinePayment, setOnlinePayment] = useState({});

    //Manual Payment
    const [manualPayment, setmanualPayment] = useState({})

    useEffect(() => {
        setData && setData({
            payMethodType,
            onlinePayment,
            manualPayment,
        })
    }, [
        payMethodType,
        onlinePayment,
        manualPayment,
    ])

    return (
        <>
            <div className='my-6'>
                <span className='text-lg font-semibold'>SECURE THE APPOINTMENT</span>

                <CollectOnlineOrManualPayment

                    customerId={customerId}
                    amount={amount}
                    setData={(data:any) => {
                        setpayMethodType(data.payMethodType);
                        setOnlinePayment(data.onlinePayment);
                        setmanualPayment(data.manualPayment);
                    }}

                    later

                />

            </div>
        </>
    );
};

export default ConfirmPaymentUI;
