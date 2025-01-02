import fetcher from '@/helper/fetcher';

const getAllService = (title = '') => {
    return !title ? fetcher.get(`/service`).then(response => {
        return response.data;
    }) :

        fetcher.get(`/service?title=${title}`).then(response => {
            return response.data;
        })
}

const getAllTeamMember = () => {
    let body = {
        "name": "Sameer",
        "email": "a@gmail.com",
        "password": "Abcd@1234",
        "telephone": "+919876543212"
    }
    return fetcher.get(`/team-member?limit=100`, body).then(response => {
        return response.data;
    })
}

const getTeamMemberServiceById = (id, body, value) => {
    return !value ? fetcher.get(`/service/team-members/${id}`, body).then(response => {
        return response.data;
    }) :
        fetcher.get(`/service/team-members/${id}?name=${value}`, body).then(response => {
            return response.data;
        })

}

const getTeamMemberAvailability = (body) => {
    return fetcher.post(`/availability/team-member`, body).then(response => {
        return response.data;
    })

}

const getCopoun = (body) => {
    return fetcher.post(`/coupon/get-discount-price`, body).then(response => {
        return response.data;
    })

}

const createBooking = (body) => {
    return fetcher.post(`/appointment`, body).then(response => {
        return response.data;
    })
}

export const BookingAppointment = {
    getAllService,
    getTeamMemberServiceById,
    getTeamMemberAvailability,
    getCopoun,
    createBooking,
    getAllTeamMember
}