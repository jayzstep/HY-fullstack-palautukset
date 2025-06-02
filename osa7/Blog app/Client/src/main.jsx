import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationContext'
import App from './App'
import { UserContextProvider } from './UserContext'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>,
)
