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

export const { setNotification } = notficationSlice.actions

export const toggleNotification = (message) => {
  return dispatch => {
    dispatch(setNotification(message))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }
}

export default notficationSlice.reducer