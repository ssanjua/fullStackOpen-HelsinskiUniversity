import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

export default function AnecdoteForm() {
    const dispatch = useDispatch()
    const addNote = (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value
        if (anecdote.length > 3) {
            dispatch(addAnecdote(anecdote))
        } else {
            return
        }
        event.target.anecdote.value = ""
    }

    return (
        <>
            <h2>create new anecdote</h2>
            <form onSubmit={addNote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}