import axios from 'axios'

const localToken = localStorage.getItem('token')
const token = 'Bearer ' + localToken

axios.defaults.baseURL = 'http://forum.loc/api/'


export const checkToken = () => {
    return (
        localStorage.getItem('token') &&
        Date.parse(localStorage.getItem('token_expires')) > Date.now()
    )
}

export const getAuthData = () => {
    const authToken = localToken
        ? token
        : 'Bearer ' + localStorage.getItem('token')
    return axios.get('/current', {
        headers: { Authorization: authToken },
    })
}

export const getPosts = (threadId) => {
    return axios.get(`/thread/${threadId}`)
}
