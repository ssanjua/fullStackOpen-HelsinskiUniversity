import { useSelector, useDispatch } from "react-redux"
import { incrementVote } from "../reducers/anecdoteReducer"

export default function AnecdoteList() {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(incrementVote(id))
    }

    const sortedAnecdote = [...anecdotes].sort((a, b) => b.votes - a.votes)

    return (
        <>
            {sortedAnecdote.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}