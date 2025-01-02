import fetcher from '@/helper/fetcher';


const getMe = () => {
    return fetcher.get(`/team-member/me`).then(response => {
        return response.data;
    })
}

const getColorOfTeamMembers = () => {
    return fetcher.get(`/team-member/colors`).then(response => {
        return response.data;
    })
}


const getTeamMembers = (params) => {
    return fetcher.get(`/team-member`, {
        params
    }).then(response => {
        return response.data;
    })
}


const getMemberById = (memberId) => {
    return fetcher.get(`/team-member/${memberId}`).then(response => {
        return response.data;
    })
}

const createMember = (body = {}) => {
    return fetcher.post(`/team-member`, body).then(response => {
        return response.data;
    })
}

const updateMemberById = (memberId, body = {}) => {
    return fetcher.put(`/team-member/${memberId}`, body).then(response => {
        return response.data;
    })
}

const updateStaffHours = (memberId, body = {}) => {
    return fetcher.post(`/team-member/manage-staff-hours/${memberId}`, body).then(response => {
        return response.data;
    })
}

const deleteCard = (body) => {
    return fetcher.post(`/payment/remove-card`, body).then((res) => {
        return res.data
    })
}

const UpdateActiveStatus = (id, active = false) => {
    return fetcher
        .put(`/team-member/update-active-status/${id}`, { active })
        .then((response) => {
            return response.data;
        });
};

const deleteTeamMember = (id) => {
    return fetcher
        .post(`/team-member/delete/${id}`)
        .then((response) => {
            return response.data;
        });
};

export const TeamMemberService = {
    getMe,
    getTeamMembers,
    getMemberById,
    updateMemberById,
    updateStaffHours,
    createMember,
    getColorOfTeamMembers,
    deleteCard,
    UpdateActiveStatus,
    deleteTeamMember
}