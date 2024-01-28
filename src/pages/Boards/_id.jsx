//Board Details
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import Box from '@mui/material/Box'
import bg from '~/assets/bg2.png'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createNewCardAPI, createNewColumnAPI, deleteColumnAPI, fetchBoardDetailsAPI, moveCardToDifferentColumnAPI, requestRefreshTokenAPI, updateBoardAPI, updateColumnAPI } from '~/apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'
import { CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { refreshToken } from '~/redux/slices/userSlice'

function Board() {
  const [board, setBoard] = useState(null)
  const user = useSelector((state) => state.user.login)
  const dispatch = useDispatch()
  let { id } = useParams()
  const navigate = useNavigate()
  const accessToken = user.accessToken

  const verifyJwtTokenAxios = axios.create()
  verifyJwtTokenAxios.interceptors.request.use(
    async (config) => {
      const decodedToken = jwtDecode(accessToken)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        const data = await requestRefreshTokenAPI(user)
        const refreshedUser = {
          ...user,
          accessToken: data.accessToken
        }
        dispatch(refreshToken(refreshedUser))
        config.headers['token'] = 'Bearer ' + data.accessToken
      }
      return config
    }
  )

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }

    fetchBoardDetailsAPI(id, accessToken, verifyJwtTokenAxios).then(board => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [accessToken])

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === newCardData.columnId)

    if (columnToUpdate) {
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }

  const moveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    updateBoardAPI(newBoard._id, { columnOrderIds: dndOrderedColumnIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardOrderIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardOrderIds
    }
    setBoard(newBoard)

    updateColumnAPI(columnId, { cardOrderIds: dndOrderedCardOrderIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    let prevCardOrderIds = dndOrderedColumns.find(column => column._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder_card')) prevCardOrderIds = []

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(column => column._id === nextColumnId)?.cardOrderIds
    })
  }

  const deleteColumn = (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(column => column._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    setBoard(newBoard)

    deleteColumnAPI(columnId)
  }

  if (!board) {
    return (
      <>
        <CircularProgress
          size={70}
          sx={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2
          }}
        />
        <Box sx={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          background: '#ccc',
          opacity: 0.5,
          zIndex: 1 }}>
        </Box>
      </>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <Box
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <BoardBar board={board}/>
        <BoardContent
          board={board}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          moveColumn={moveColumn}
          moveCardInTheSameColumn={moveCardInTheSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
          deleteColumn={deleteColumn}
        />
      </Box>
    </Container>
  )
}

export default Board
