import fetcher from '@/helper/fetcher';


const login = (email, password) => {
    return fetcher.post(`/auth/login`, {
        email, password
    }).then(response => {
        return response.data;
    })
}

const signup = (email, password, telephone, name) => {
    return fetcher.post(`/auth/create-account`, {
        email, password, telephone, name
    }).then(response => {
        return response.data;
    })
}

const createAccountWhileBooking = (body) => {
    return fetcher.post(`/auth/create-account-booking`, body).then(response => {
        return response.data;
    })
}

const reset = (newPassword, token) => {
    return fetcher.post(`/auth/reset-password?token=${token}`, {
        newPassword
    }).then(response => {
        return response.data;
    })
}


const forgot = (email) => {
    return fetcher.post(`/auth/forgot-password`, {
        email
    }).then(response => {
        return response.data;
    })
}

export const AuthService = {
    login, signup, reset, forgot,
    createAccountWhileBooking
}
