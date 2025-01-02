import React from 'react'
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Modal from '@/components/ui/Modal';
import AddNewPaymentCardDefault from './';

function AddNewPaymentCardModal({
    customerId
}) {
    return (
        <Modal target={<AddCircleOutlineOutlinedIcon />}>
            <AddNewPaymentCardDefault customerId={customerId} refresh={() => {
                window.location.reload()
            }} />
        </Modal>
    )
}

export default AddNewPaymentCardModal