import fetcher from '@/helper/fetcher';


const getAllCustomer = (params) => {
    return fetcher.get(`/customer`, {
        params
    }).then(response => {
        return response.data;
    })
}
const getSingleMember = (id) => {
    return fetcher.get(`/customer/${id}`).then(response => {
        return response.data;
    })
}

const createCustomer = (body) => {
    return fetcher.post(`/customer`, body).then(response => {
        return response.data;
    })
}

const updateCustomer = (id, body) => {
    return fetcher.put(`/customer/${id}`, body).then(response => {
        return response.data;
    })
}


const deleteCustomer = (customerId) => {
    return fetcher.post(`/customer/delete/${customerId}`).then(response => {
        return response.data;
    })
}

const getUpcomingAppointments = (id, params) => {
    return fetcher.get(`/customer/upcoming/${id}`, {
        params
    }).then(response => {
        return response.data;
    })
}


const getPastAppointments = (id, params) => {
    return fetcher.get(`/customer/past/${id}`, {
        params
    }).then(response => {
        return response.data;
    })
}

const getPaymentHistory = (customerId, params) => {
    return fetcher.get(`/customer/payment-history/${customerId}`, { params }).then(response => {
        return response.data;
    })
}


const getSavedCards = (id) => {
    return fetcher.get(`/customer/saved-cards/${id}`).then(response => {
        return response.data;
    })
}

const manageNotes = (id, body) => {
    return fetcher.post(`/customer/notes/${id}`, body).then(response => {
        return response.data;
    })
}

const getIntakeform = (id) => {
    return fetcher.get(`/customer/intake/get-form/${id}`).then(response => {
        return response.data;
    })
}

const manageIntakeform = (id, body) => {
    return fetcher.post(`/customer/intake/manage-change-request/${id}`, body).then(response => {
        return response.data;
    })
}

export const CustomerService = {
    getAllCustomer,
    getSingleMember,
    createCustomer,
    updateCustomer,
    deleteCustomer,


    getUpcomingAppointments,
    getPastAppointments,
    getPaymentHistory,
    getSavedCards,
    manageNotes,

    getIntakeform,
    manageIntakeform,

}
