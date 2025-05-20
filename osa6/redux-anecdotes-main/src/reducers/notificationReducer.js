import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: "",
  reducers: {
    updateNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ""
    }
  }
})

export const { updateNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (content, seconds) => {
  return async dispatch => {
    dispatch(updateNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}
