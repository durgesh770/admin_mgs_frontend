// react import
import React, { useState } from 'react'

//component 
import ButtonCom from '@/components/ui/Button';

// mui
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Button, Divider, Grid, Typography } from '@mui/material'
import { collectManualPayment, collectPaymentFromStripe } from '@/hooks/Payment';
import CollectOnlineOrManualPayment from '@/features/Payment/CollectOnlineOrManualPayment';

const Tips = ({ tips = [], setTips }) => {

    const handleChange = (index, value) => {
        let data = [...tips];
        let item = data[index];
        item.amount = Number(value);
        setTips(data)
    }

    return (
        <div className="p-2 sm:p-6">
            {tips.map((tip, index) => {
                return <div className="flex flex-row flex-wrap items-center  justify-between mb-2">
                    <p className="font-bold mulish">TIP ANY AMOUNT TO {tip.teamMemberName}:</p>
                    <Input
                        className={``}
                        placeholder="Amount"
                        type="number"

                        value={tip.amount}
                        onChange={(e) => {
                            handleChange(index, e.target.value)
                        }}
                        borderline={false}
                    />
                </div>
            })
            }
        </div>
    );
};

const CollectPaymentModal = ({ open, setOpen, customerId, appointmentId, appointmentData, amount }) => {

    //Tips
    const defaultTips = appointmentData?.bookings?.reduce((acc, curr) => {
        // Check if teamMemberId already exists in the accumulator
        const existingMember = acc.find(member => member.teamMemberId === curr.teamMemberId);

        // If not found, add the team member to the accumulator
        if (!existingMember) {
            acc.push({
                teamMemberId: curr.teamMemberId,
                teamMemberName: curr.teamMemberName,
            });
        }

        return acc;
    }, []);

    const [tips, setTips] = useState(defaultTips);
    let payTips = tips.filter((tip) => tip?.amount > 0);
    let payTipsAmount = payTips.reduce((total, tip) => total + tip.amount, 0);
    let finalAmount = amount + payTipsAmount;

    //payment integration
    const [paymentData, setPaymentData] = useState({});

    const chargeOnlineHook = collectPaymentFromStripe();
    const chargeManualHook = collectManualPayment();
    const loading = chargeOnlineHook.loading || chargeManualHook.loading;


    const handleChargePayment = async () => {

        if (paymentData.payMethodType == "online") {
            await chargeOnlineHook.submit({
                "customerId": customerId,
                "amount": finalAmount,
                "appointmentId": appointmentId,
                "paymentType": "pending_amount",
                "paymentMethodId": paymentData.onlinePayment.paymentCardId,
                tips: payTips
            })
        } else if (paymentData.payMethodType == "manual") {

            await chargeManualHook.submit({
                "customerId": customerId,
                "appointmentId": appointmentId,
                "paymentType": "pending_amount",
                "payment": {
                    "amount": paymentData.manualPayment.amount,
                    "paymentMethod": paymentData.manualPayment.paymentMethod,
                    "paymentRefNo": paymentData.manualPayment.ref,
                },
                tips: payTips
            })
        }

    }


    return (
        <>
            <Modal customOpen={open} customClose={setOpen}>
                <div className='md:w-[40rem] max-h-[40rem] md:p-5 p-2' >
                    <Grid className='pt-2'
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingBottom: "1rem"
                        }}
                    >
                        <Grid><Button onClick={() => setOpen(false)} ><ClearOutlinedIcon /></Button></Grid>

                        <Grid sx={{
                            paddingLeft: "16%",
                            '@media (max-width: 430px)': {
                                paddingLeft: "12%",
                            },
                            '@media (max-width: 380px)': {
                                paddingLeft: "8%",
                            },
                        }}>
                            <Typography sx={{ fontSize: "22px", fontWeight: 600 }} >Collect Payment</Typography>
                        </Grid>
                    </Grid>
                    <Divider />

                    {/* Collect Tips  */}
                    <Tips tips={tips} setTips={setTips} />
                    <Divider />

                    <CollectOnlineOrManualPayment
                        customerId={customerId}
                        setData={setPaymentData}
                        amount={finalAmount}
                    />
                    <Divider />

                    {/* button component  */}
                    <Grid className='float-right  StaffMemberCss p-4' >
                        <Grid>
                            <ButtonCom loading={loading} btnType='secondary' onClick={handleChargePayment}>Pay pending</ButtonCom>
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        </>
    )
}

export default CollectPaymentModal

