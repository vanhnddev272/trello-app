import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createNewCardAPI } from '~/apis'

const initialState = {
  boardId: '',
  columnId: '',
  title: ''
}

export const postCard = createAsyncThunk(
  'column/postCard',
  async (newCardData) => {
    const response = await createNewCardAPI(newCardData)
    return response.data
  }
)

export const cardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCard.pending, (state, action) => {
        state.boardId = ''
        state.columnId = ''
        state.title = ''
      })
      .addCase(postCard.fulfilled, (state, action) => {
        const { boardId, columnId, title } = action.payload
        state.boardId = boardId
        state.columnId = columnId
        state.title = title
      })
  }
})

export const selectCard = (state) => state.card
export default cardSlice.reducer
