import fetcher from '@/helper/fetcher';


const getAllRole = (params) => {
    return fetcher.get(`/role`, {
        params
    }).then(response => {
        return response.data;
    })
}

const getSingleRole = (roleId) => {
    return fetcher.get(`/role/${roleId}`).then(response => {
        return response.data;
    })
}


const getRoleInfo = (body) => {
    return fetcher.post(`/role/role-info`, body).then(response => {
        return response.data;
    })
}

const deleteRole = (roleId) => {
    return fetcher.delete(`/role/${roleId}`).then(response => {
        return response.data;
    })
}

const updateRole = (roleId, body) => {
    return fetcher.put(`/role/${roleId}`, body).then(response => {
        return response.data;
    })
}


const createRole = (body) => {
    return fetcher.post(`/role`, body).then(response => {
        return response.data;
    })
}


export const RoleService = {
    getAllRole,
    createRole,
    getSingleRole,
    getRoleInfo,
    updateRole,
    deleteRole
}
