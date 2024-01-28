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
      state.login.username = action.payload.loginUser.username
      state.login.email = action.payload.loginUser.email
      state.login.accessToken = action.payload.accessToken
      state.login.success = true
    },
    refreshToken: (state, action) => {
      state.login.accessToken = action.payload.accessToken
    },
    logout: (state, action) => {
      state.login.username = ''
      state.login.email = ''
      state.login.accessToken = ''
      state.login.success = false
    }
  }
})

export const { loginUser, refreshToken, logout } = userSlice.actions
export default userSlice.reducer
