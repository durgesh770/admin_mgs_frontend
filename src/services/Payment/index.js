import fetcher from '@/helper/fetcher';


const collectPaymentFromStripe = (body) => {
    return fetcher.post(`/payment/stripe-collect-payment`, body).then(response => {
        return response.data;
    })
}

const collectManualPayment = (body) => {
    return fetcher.post(`/payment/collect-manual-payment`, body).then(response => {
        return response.data;
    })
}

const collectLater = (body) => {
    return fetcher.post(`/payment/collect-later`, body).then(response => {
        return response.data;
    })
}



const addNewPaymentCard = (body) => {
    return fetcher.post(`/payment/add-new-payment-card`, body).then(response => {
        return response.data;
    })
}

const getPaymentHistory = (params) => {
    return fetcher.get(`/payment/history`, { params }).then(response => {
        return response.data;
    })
}

const getInvoice = (id) => {
    return fetcher.get(`/payment/invoice/${id}`).then(response => {
        return response.data;
    })
}

export const PaymentService = {
    collectPaymentFromStripe,
    collectManualPayment,
    collectLater,
    addNewPaymentCard,

    getPaymentHistory,
    getInvoice
}
