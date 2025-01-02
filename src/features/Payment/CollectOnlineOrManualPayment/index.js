import ManualPayment from '@/components/ui/Appointments/Payment/ManualPayment';
import SelectCard from '@/components/ui/Appointments/Payment/SelectCard';
import { FormControlLabel, Radio } from '@mui/material';
import React, { useEffect, useState } from 'react'

function CollectOnlineOrManualPayment({ customerId, setData, amount, later }) {

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


    return (<>

        {/* Online Payment  */}
        <div className='flex items-start justify-start gap-4 my-1'>
            <FormControlLabel
                control={
                    <Radio
                        checked={payMethodType === 'online'}
                        onChange={() => setpayMethodType('online')}
                        color='success'
                    />
                }
                label='Collect Online'
            />
        </div>

        {payMethodType === 'online' && <SelectCard customerId={customerId} setData={setOnlinePayment} />}

        {/* Manual Payment  */}
        <div className='flex items-start justify-start gap-4 my-1'>
            <FormControlLabel
                control={
                    <Radio
                        checked={payMethodType === 'manual'}
                        onChange={() => setpayMethodType('manual')}
                        color='success'
                    />
                }
                label='Manual TRX'
            />
        </div>

        {payMethodType === 'manual' && <ManualPayment amount={amount} setData={setmanualPayment} />}


        {/* Later Payment  */}
        {later && <div className='flex items-start justify-start gap-4 my-1'>
            <FormControlLabel
                control={
                    <Radio
                        checked={payMethodType == "later"}
                        onChange={() => setpayMethodType("later")}
                        color="success"
                    />
                }
                label="Collect Later"
            />
        </div>}

    </>)
}

export default CollectOnlineOrManualPayment