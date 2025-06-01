import { createContext, useReducer, useEffect } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'CLEAR':
    return ''
  default:
    return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(
    userReducer,
    '',
  )

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
