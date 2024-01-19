import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: {
    username: '',
    email: '',
    accessToken: '',
    success: false
  },
  register: {
    success: false
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.login.username = action.payload.user.loginUser.username
      state.login.email = action.payload.user.loginUser.email
      state.login.accessToken = action.payload.user.accessToken
      state.login.success = true
    }
  }
})

export const { loginUser } = userSlice.actions
export default userSlice.reducer
