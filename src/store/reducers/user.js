import { GET_AUTH, LOGOUT_SUCCESS } from '../constants'

const initialState = { isAuthData: false, auth: null }

export default function user(state = initialState, action) {
    switch (action.type) {
        case GET_AUTH:
            state = { isAuthData: true, auth: action.auth }
            return state

        case LOGOUT_SUCCESS:
            return initialState

        default:
            return state
    }
}
