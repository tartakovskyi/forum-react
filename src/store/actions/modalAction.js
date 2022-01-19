import { HIDE_MODAL, SHOW_MODAL } from '../constants'

export const hideModalAction = () => ({
    type: HIDE_MODAL,
})

export const showModalAction = data => ({
    type: SHOW_MODAL,
    data
})
