import fetcher from '@/helper/fetcher';


const createAppointment = (body) => {
    return fetcher.post(`/appointment`, body).then(response => {
        return response.data;
    })
}

const getAppointmentById = (id) => {
    return fetcher.get(`/appointment/${id}`).then(response => {
        return response.data;
    })
}

const getAllAppointment = (params) => {
    return fetcher.get(`/appointment/all`, {
        params
    }).then(response => {
        return response.data;
    })
}

const getAllApprovedAppointment = (params) => {
    return fetcher.get(`/appointment/all-approved`, {
        params
    }).then(response => {
        return response.data;
    })
}

const rescheduleAppointment = (id,body) => {
    return fetcher.post(`/appointment/reschedule/${id}`, body).then(response => {
        return response.data;
    })
}

const approvedAppointment = (id) => {
    return fetcher.post(`/appointment/approved/${id}`).then(response => {
        return response.data;
    })
}

const rejectedAppointment = (id) => {
    return fetcher.post(`/appointment/rejected/${id}`).then(response => {
        return response.data;
    })
}

const deleteAppointment = (id) => {
    return fetcher.post(`/appointment/delete/${id}`).then(response => {
        return response.data;
    })
}

const cancelAppointment = (id, refundPayment) => {
    return fetcher.post(`/appointment/cancel/${id}?refundPayment=${refundPayment}`).then(response => {
        return response.data;
    })
}

const getAllNotes = (body) => {
    return fetcher.post(`/appointment/notes`, body).then(response => {
        return response.data;
    })
}

const addAllNotes = (id, body) => {
    return fetcher.post(`appointment/add-notes/${id}`, body).then(response => {
        return response.data;
    })
}
const createChangeRequest = (id, body) => {
    return fetcher.post(`appointment/change-request/${id}` , body).then(response => {
        return response.data;
    })
}

const confirmedAppointment = (appointmentId) => {
    return fetcher.post(`/appointment/confirmed/${appointmentId}`).then((res)=>{
        return res.data
    })
}

export const AppointmentService = {
    createAppointment,
    rescheduleAppointment,
    
    getAllAppointment,
    getAllApprovedAppointment,
    approvedAppointment,
    rejectedAppointment,

    cancelAppointment,
    deleteAppointment,
    getAllNotes,
    addAllNotes,
    getAppointmentById,
    createChangeRequest,

    confirmedAppointment
}
