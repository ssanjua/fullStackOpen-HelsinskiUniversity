import axios from "axios";
const baseurl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const res = await axios.get(baseurl);
    console.log(res.data)
    return res.data;
}

export const createNew = async (content) => {
    const object = { content, votes: 0, id: getId() }
    const response = await axios.post(baseurl, object)
    return response.data
}

export const updateVote = async ({ id, votes }) => {
    console.log({ id, votes })
    const object = { votes }
    const response = await axios.patch(`${baseurl}/${id}`, object)
    return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)