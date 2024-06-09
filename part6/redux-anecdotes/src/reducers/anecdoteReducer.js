import { createSlice } from "@reduxjs/toolkit"

const anecdotesSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    incrementVote: (state, action) => {
      return [...state].map(e => {
        if (e.id === action.payload) {
          return { ...e, votes: e.votes + 1 }
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


export const { incrementVote, addAnecdote, appendAnecdote } = anecdotesSlice.actions

export default anecdotesSlice.reducer