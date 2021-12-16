import { combineReducers } from 'redux'
import user from './user'
import threads from './threads'

export const reducers = combineReducers({
    user,
    threads,
})
