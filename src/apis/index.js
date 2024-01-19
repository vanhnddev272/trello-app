import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const loginAPI = async (userData) => {
  return (await axios.post(`${API_ROOT}/v1/login`, userData)).data
}

export const registerAPI = async (userData) => {
  return (await axios.post(`${API_ROOT}/v1/register`, userData)).data
}

export const fetchBoardDetailsAPI = async (boardId, accessToken) => {
  return (await axios.get(`${API_ROOT}/v1/boards/${boardId}`, { headers: { token: `Bearer ${accessToken}` } })).data
}

export const updateBoardAPI = async (boardId, updateData) => {
  return (await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)).data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  return (await axios.put(`${API_ROOT}/v1/boards/supports/move_card`, updateData)).data
}

export const createNewColumnAPI = async (newColumnData) => {
  return (await axios.post(`${API_ROOT}/v1/columns`, newColumnData)).data
}

export const updateColumnAPI = async (columnId, updateData) => {
  return (await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)).data
}

export const deleteColumnAPI = async (columnId) => {
  return (await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)).data
}

export const createNewCardAPI = async (newCardData) => {
  return (await axios.post(`${API_ROOT}/v1/cards`, newCardData)).data
}
