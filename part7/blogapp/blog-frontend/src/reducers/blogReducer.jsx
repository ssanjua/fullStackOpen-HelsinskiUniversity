import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "../services/blogs";


export const likeBlog = createAsyncThunk("blogs/likeBlog", async (id) => {
    console.log("Fetching blog with id:", id);
    const blog = await blogService.getBlog(id);
    const updatedBlog = { ...blog, likes: (blog.likes || 0) + 1 };
    console.log("Updating likes for blog with id:", id);
    await blogService.updateLikes(id, updatedBlog);
    return updatedBlog;
  });

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  await blogService.deleteBlog(id);
  return id;
});

const BlogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (_, action) => {
      return action.payload;
    },
    addBlog: (state, action) => {
      return [...state, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(likeBlog.fulfilled, (state, action) => {
        console.log("likeBlog fulfilled:", action.payload);
        return state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        );
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        return state.filter((blog) => blog.id !== action.payload);
      });
  },
});

export const { setBlogs, addBlog } = BlogSlice.actions;

export default BlogSlice.reducer;