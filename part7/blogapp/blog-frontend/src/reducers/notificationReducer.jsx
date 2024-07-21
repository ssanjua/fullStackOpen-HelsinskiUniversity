import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify: (state, action) => {
      return action.payload;
    },
    removeNotification: () => {
      return initialState;
    },
  },
});

export const { notify, removeNotification } = notificationSlice.actions;

export const setNotification = (notification, time = 1000) => {
  return (dispatch) => {
    dispatch(notify(notification));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time);
  };
};

export default notificationSlice.reducer
