import { createSlice } from "@reduxjs/toolkit";

const BlogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs: (_, action) => {
            return action.payload
        },
        addBlog: (state, action) => {
            return [...state, action.payload]
        }
    }
})
export const { setBlogs, addBlog } = BlogSlice.actions

export default BlogSlice.reducer