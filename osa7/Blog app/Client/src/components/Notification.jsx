import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

export const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  if (notification === '') {
    return null
  }

  return (
    <div>
      <h3>{notification}</h3>
    </div>
  )
}
