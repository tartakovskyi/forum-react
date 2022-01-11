import axios from 'axios'

const localToken = localStorage.getItem('token')

axios.defaults.baseURL = 'http://forum.loc/api/'


const getToken = () => {
    return localToken
        ? 'Bearer ' + localToken
        : 'Bearer ' + localStorage.getItem('token')
}


export const getAuthData = () => {
    const authToken = getToken()
    return axios.get('/get-auth', {
        headers: { Authorization: authToken },
    })
}


export const register = (data) => {
    return axios.post(`/register`, data)
}


export const addPost = (data) => {
    const authToken = getToken()
    return axios.post('/post', data, {
        headers: { Authorization: authToken },
    })
}


export const getPosts = (threadId, limit) => {
    return axios.get(`/thread/${threadId}`, { params: { limit }})
}


export const destroyThread = (threadId) => {
    const authToken = getToken()
    return axios.delete(`/thread/${threadId}`, {
        headers: { Authorization: authToken },
    })
}

export const getThreads = (limit) => {
    return axios.get(`/thread`, { params: { limit }})
}


export const saveThread = (method, threadId, data) => {
    const authToken = getToken()
    const path = '/thread' + (threadId ? '/' + threadId : '')
    return axios[method](path, data, {
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
