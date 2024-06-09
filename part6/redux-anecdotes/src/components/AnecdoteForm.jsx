import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer";


export default function AnecdoteForm() {
    const dispatch = useDispatch()
    
    const addNote =  (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value
        if (anecdote.length > 3) {
            dispatch(createAnecdote(anecdote))
            dispatch(setNotification(`you created ${anecdote}`))
        } else {
            return;
        }
        event.target.anecdote.value = ""
    }
    
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addNote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}