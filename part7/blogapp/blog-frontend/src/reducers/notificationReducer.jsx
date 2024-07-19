const initialState = {
  message: null,
  type: null,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    case 'CLEAR_NOTIFICATION':
      return {
        message: null,
        type: null,
      }
    default:
      return state;
  }
}

export const setNotification = (message, type) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: { message, type },
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer