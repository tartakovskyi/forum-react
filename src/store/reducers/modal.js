import { HIDE_MODAL, SHOW_MODAL } from '../constants'

const initialState = { active: false, data: {} }

export default function user(state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return { active: true, data: action.data }

        case HIDE_MODAL:
            return initialState

        default:
            return state
    }
}
