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
    return axios.get('/get-auth', {
        headers: { Authorization: authToken },
    })
}

export const addPost = (data) => {
    return axios.post(`/post`, data)
}

export const getPosts = (threadId) => {
    return axios.get(`/thread/${threadId}`)
}
