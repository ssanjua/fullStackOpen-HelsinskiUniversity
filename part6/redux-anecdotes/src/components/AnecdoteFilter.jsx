import { useDispatch } from "react-redux";
import { filterAction } from "../reducers/filterReducer"

export default function AnecdoteFilter() {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        const filterText = event.target.value.trim();
        dispatch(filterAction(filterText))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}