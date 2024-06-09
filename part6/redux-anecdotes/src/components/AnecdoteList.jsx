import { useSelector, useDispatch } from "react-redux"
import { initialAnecdotes, incrementVoteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { useEffect } from "react"


export default function AnecdoteList() {
  const anecdotes = useSelector(state => {
    if (state.filter === "ALL") {
      return state.anecdote
    } else {
      return state.anecdote.filter(e => e.content.includes(state.filter))
    }
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(setNotification(`you voted ${anecdote.content}`, 2000))
    dispatch(incrementVoteAnecdote({ id: anecdote.id, vote: anecdote.votes }))
  }

  const sortedAnecdote = [...anecdotes].sort((a, b) => b.votes - a.votes)


  useEffect(() => {
    dispatch(initialAnecdotes())
  }, []) // eslint-disable-line

  return (
    <>
      {sortedAnecdote.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}