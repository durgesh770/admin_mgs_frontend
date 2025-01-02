import fetcher from '@/helper/fetcher';

const findTeamMemberAvailability = (body) => {
    return fetcher.post(`/availability/team-member`, body).then(response => {
        return response.data;
    })
}

const createCustomAvailability = (body) => {
    return fetcher.post(`/availability/create-custom-timeslots`, body).then(response => {
        return response.data;
    })
}

export const AvailabilityService = {
    findTeamMemberAvailability,
    createCustomAvailability
}
