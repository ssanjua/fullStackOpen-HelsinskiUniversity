import { useContext } from 'react'
import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "NOTIFY":
            return action.payload
        case "REMOVE":
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

// eslint-disable-next-line react/prop-types
export const NotificationContextProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    const showNotification = (content) => {
        notificationDispatch({ type: "NOTIFY", payload: content });
        setTimeout(() => {
            notificationDispatch({ type: "REMOVE" })
        }, 5000)
    }

    return (
        <NotificationContext.Provider value={[notification, showNotification]}>
            {children}
        </NotificationContext.Provider>
    )
}


export const useNotificationContent = () => {
    return useContext(NotificationContext)[0]
}


export const useNotificationDispatch = () => {
    return useContext(NotificationContext)[1]
}

export default NotificationContext