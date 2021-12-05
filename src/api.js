import axios from 'axios'

axios.defaults.baseURL = 'http://forum.loc/api/'


export const getPosts = (threadId) => {
    return axios.get(`/thread/${threadId}`)
}
