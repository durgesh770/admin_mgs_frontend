import fetcher from '@/helper/fetcher';

const allReports = () => {
    return fetcher.get(`/reports/all-reports`, {
    }).then(response => {
        return response.data;
    })
}
const allapprovedReports = () => {
    return fetcher.get(`/reports/approved-reports`, {
    }).then(response => {
        return response.data;
    })
}

export const AccountsService = {
    allReports,
    allapprovedReports
}
