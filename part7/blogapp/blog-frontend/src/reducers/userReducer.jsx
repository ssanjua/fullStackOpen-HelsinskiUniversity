import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: localStorage.getItem("username")
}

const userReducer = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
          const { username, token } = action.payload;
          localStorage.setItem("username", username);
          localStorage.setItem("token", token);
          return { ...state, username, token }
        },
        reset: () => {
          localStorage.removeItem("username");
          localStorage.removeItem("token");
          return { username: null, token: null }
        },
        setUsers(state, action) {
          return action.payload;
        },
    }
})
export const { setUser, reset, setUsers } = userReducer.actions

export default userReducer.reducer