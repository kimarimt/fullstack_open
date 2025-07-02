import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    default:
      return state;
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext