import fetcher from '@/helper/fetcher';


const getAllServices = (params) => {
    return fetcher.get(`/service`, {
        params
    }).then(response => {
        return response.data;
    })
}

const createService = (body) => {
    return fetcher.post(`/service`, body).then(response => {
        return response.data;
    })
}

const updateService = (id,body) => {
    return fetcher.put(`/service/${id}`, body).then(response => {
        return response.data;
    })
}

const deleteService = (id) => {
    return fetcher.delete(`/service/${id}`).then(response => {
        return response.data;
    })
}

export const ServicesService = {
    getAllServices,
    createService,
    updateService,
    deleteService
}
