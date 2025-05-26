import { createContext, useReducer } from 'react'
import { useEffect } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload
    case "CLEAR_NOTIFICATION":
      return ""
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "")

  useEffect(() => {
    if (notification !== "") {
      setTimeout(() => {
        notificationDispatch({type: "CLEAR_NOTIFICATION"})
      }, 5000)
    }
  }, [notification])
  return (
  <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
