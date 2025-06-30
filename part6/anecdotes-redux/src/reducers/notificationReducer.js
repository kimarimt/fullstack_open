import { createSlice } from '@reduxjs/toolkit'

export const toggleNotification = (message, dispatch) => {
  dispatch(setNotification(message))

  setTimeout(() => {
    dispatch(setNotification(null))
  }, 5000)
}

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
export default notficationSlice.reducer