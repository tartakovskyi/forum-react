import { combineReducers } from 'redux'
import modal from './modal'
import user from './user'

export const reducers = combineReducers({
    modal,
    user
})

export type RootState = ReturnType