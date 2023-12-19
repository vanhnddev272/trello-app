import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardDetailsAPI = async (boardId) => {
  return await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
}

export const createNewColumnAPI = async (newColumnData) => {
  return await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
}

export const createNewCardAPI = async (newCardData) => {
  return await axios.post(`${API_ROOT}/v1/cards`, newCardData)
}
