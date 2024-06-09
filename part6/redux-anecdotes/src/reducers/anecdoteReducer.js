import { createSlice } from "@reduxjs/toolkit"
import services from "../services/anecdote"

const anecdotesSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    incrementVote: (state, action) => {
      return [...state].map(e => {
        if (e.id === action.payload.id) {
          return { ...action.payload }
        }
        return e
      })
    },
    addAnecdote: (state, action) => {
      return [...state, action.payload]
    },
    appendAnecdote: (state, action) => {
      return [...action.payload]
    }
  }
})

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await services.getAll()
    dispatch(appendAnecdote(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await services.createNew(anecdote)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const incrementVoteAnecdote = ({id, vote}) => {
  return async dispatch => {
    const newAnecdote = await services.updateVote(id, vote + 1)
    dispatch(incrementVote(newAnecdote))
  }
}

export const { incrementVote, addAnecdote, appendAnecdote } = anecdotesSlice.actions

export default anecdotesSlice.reducer