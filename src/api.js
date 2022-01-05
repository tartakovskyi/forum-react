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

export const register = (data) => {
    return axios.post(`/register`, data)
}

export const addPost = (data) => {
    const authToken = localToken
        ? token
        : 'Bearer ' + localStorage.getItem('token')
    return axios.post('/post', data, {
        headers: { Authorization: authToken },
    })
}

export const getPosts = (threadId, limit) => {
    return axios.get(`/thread/${threadId}`, { params: { limit }})
}

export const getThreads = (limit) => {
    return axios.get(`/thread`, { params: { limit }})
}

export const openThread = (data) => {
    const authToken = localToken
        ? token
        : 'Bearer ' + localStorage.getItem('token')
    return axios.post('/thread', data, {
        headers: { Authorization: authToken },
    })
}

export const uploadUserpic = (file) => {
    var formData = new FormData();
    formData.append("userpic", file);
    return axios.post('/user/userpic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
}
