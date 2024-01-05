import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './slices/boardSlice'
import columnReducer from './slices/columnSlice'

export const store = configureStore({
  reducer: {
    board: boardReducer,
    column: columnReducer
  }
})
