import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { Alert } from '@mui/material'

export const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  if (notification === '') {
    return null
  }

  return (
    <div>
      <Alert severity="success">
        {notification}
      </Alert>
    </div>
  )
}
