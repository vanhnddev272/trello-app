import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchBoardDetailsAPI } from '~/apis'

const initialState = {
  title: '',
  description: '',
  type: '',
  columns: [],
  columnOrderIds: []
}

export const getBoardDetails = createAsyncThunk(
  'boards/getBoard',
  async (boardId) => {
    const response = await fetchBoardDetailsAPI(boardId)
    return response.data
  }
)

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardDetails.pending, (state, action) => {
        state.title = ''
        state.description = ''
        state.type = ''
        state.columns = []
        state.columnOrderIds = []
      })
      .addCase(getBoardDetails.fulfilled, (state, action) => {
        const { title, description, type, columns, columnOrderIds } = action.payload
        state.title = title
        state.description = description
        state.type = type
        state.columns = columns
        state.columnOrderIds = columnOrderIds
      })
  }
})

export const selectBoard = (state) => state.board
export default boardSlice.reducer
