import { createSlice } from '@reduxjs/toolkit'

const notficationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    }
  }
})

const { setNotification } = notficationSlice.actions

export const toggleNotification = (message, secs = 5000) => {
  return dispatch => {
    dispatch(setNotification(message))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, secs)
  }
}

export default notficationSlice.reducer