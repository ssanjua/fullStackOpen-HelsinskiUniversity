import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: "",
    reducers: {
        notify: (state, action) => {
            return action.payload
        },
        removeNotification: () => {
            return ""
        }
    }
})

export const { notify, removeNotification } = notificationSlice.actions

export const setNotification = (notification, time = 1000) => {
    return dispatch => {
        dispatch(notify(notification))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time)
    }
}


export default notificationSlice.reducer