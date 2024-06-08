import { combineReducers } from 'redux'
import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'

const reducer = combineReducers({
    anecdote: anecdoteReducer,
    filter: filterReducer
})

export default reducer;