// useActionHooks.js
import { useState } from 'react';
import { approvedAppointment, cancelAppointment, deleteAppointment, rejectedAppointment } from '@/hooks/Appointment';
import { handleApppointmentAction } from '@/hooks/Appointment/hooks';

export const useActionHooks = ({ appointments = [] }) => {
    // Action modal
    const [refundPayment, setRefundPayment] = useState(false)
    const [sms, setSms] = useState({
        smsDrawer: false,
        smsAppointment: {}
    })
    const [collectPayment, setCollectPayment] = useState({
        open: false,
        customerId: '',
        appointmentId: '',
        amount: 0,
        appointmentData: {}
    });

    const [dynamicModal, setdynamicModal] = useState({
        open: false,
        title: '',
        btnfirst: '',
        btnsec: '',
        appointmentId: '',
        actionId: '',
    });

    const handleModalClose = () => {
        setdynamicModal({
            ...dynamicModal,
            open: false,
        });
    };
    const handleDrawerClose = () => {
        setSms({
            ...sms,
            smsDrawer: false,
        });
    };

    // Hooks
    const approvedAppointmentHook = approvedAppointment();
    const rejectedAppointmentHook = rejectedAppointment();
    const deleteAppointmentHook = deleteAppointment();
    const cancelAppointmentHook = cancelAppointment();

    const handleConfirmbtn = async () => {
        const { appointmentId, actionId } = dynamicModal;

        if (actionId === 'approve-reject') {
            let res = await approvedAppointmentHook.submit(appointmentId);
            handleModalClose()
        }
        if (actionId == 'delete-appointment') {
            let res = await deleteAppointmentHook.submit(appointmentId);
            handleModalClose()
        }

        if (actionId == 'cancel') {
            if (!refundPayment) {
                setRefundPayment(true)
                setdynamicModal((pre) => ({
                    ...pre,
                    title: "Are you sure!  you want to Refund Payment ?"
                }))
            } else {
                await cancelAppointmentHook.submit(appointmentId, refundPayment);
                setRefundPayment(false)
            }
        }
    };

    const handleRightbtn = async () => {
        const { appointmentId, actionId } = dynamicModal;

        if (actionId == 'approve-reject') {
            let res = await rejectedAppointmentHook.submit(appointmentId);
        }
        if (actionId == 'cancel') {
            if (refundPayment) {
                await cancelAppointmentHook.submit(appointmentId, refundPayment);
                setRefundPayment(false)
            }

        }

        handleModalClose();
    };

    const handleActionClick = (appointmentId, actionItem, paymentId, setIsDrawerOpen) => {
        const modalResponse = handleApppointmentAction(appointmentId, actionItem, paymentId, setIsDrawerOpen);
        if (modalResponse) {
            setdynamicModal(modalResponse);
        }

        if (actionItem.id === 'collect-payment') {
            const getAppointment = appointments.find((appointment) => appointment.id == appointmentId);
            const amount = getAppointment.paymentId?.payment?.amount;

            setCollectPayment({
                open: true,
                customerId: getAppointment?.customerId?.id || getAppointment?.customerId,
                appointmentId: appointmentId,
                amount: amount,
                appointmentData: getAppointment
            });
        }
        if (actionItem.id === 'sms') {
            const getAppointment = appointments.find((appointment) => appointment.id == appointmentId);
            setSms(() => ({
                smsDrawer: true,
                smsAppointment: getAppointment
            }))
        }
    };

    return {
        collectPayment, setCollectPayment,
        dynamicModal, setdynamicModal,
        handleModalClose,
        handleConfirmbtn,
        handleRightbtn,
        handleActionClick,
        sms,
        handleDrawerClose
    };
};
