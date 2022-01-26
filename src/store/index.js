import { createStore, applyMiddleware, Action } from 'redux'
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'
import { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { reducers, RootState } from './reducers'

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk, logger))
)
window.store = store

export type AppThunk = ThunkAction<void, RootState, unknown, Action>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch()

export default store