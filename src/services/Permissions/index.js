import fetcher from '@/helper/fetcher';


const getAllPermission = () => {
    return fetcher.get(`/permission`, {
    }).then(response => {
        return response.data;
    })
}


export const PermissionService = {
    getAllPermission
}
