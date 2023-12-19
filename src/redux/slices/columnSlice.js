import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createNewColumnAPI } from '~/apis'

const initialState = {
  boardId: '',
  title: '',
  cards: [],
  cardOrderIds: []
}

export const postColumn = createAsyncThunk(
  'column/postColumn',
  async (newColumnData) => {
    const response = await createNewColumnAPI(newColumnData)
    return response.data
  }
)

export const columnSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postColumn.pending, (state, action) => {
        state.boardId = ''
        state.title = ''
        state.cards = []
        state.cardOrderIds = []
      })
      .addCase(postColumn.fulfilled, (state, action) => {
        const { boardId, title } = action.payload
        state.boardId = boardId
        state.title = title
        state.cards = []
        state.cardOrderIds = []
      })
  }
})

export const selectColumn = (state) => state.column
export default columnSlice.reducer
