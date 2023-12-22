import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import Box from '@mui/material/Box'
import bg from '~/assets/bg2.png'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBoardDetailsAPI } from '~/apis'
import { mockData } from '~/apis/mock-data'

function Board() {
  const [board, setBoard] = useState(null)
  let { id } = useParams()

  useEffect(() => {
    fetchBoardDetailsAPI(id).then(board => {
      setBoard(board)
    })
  }, [id])

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
        <BoardContent board={board}/>
      </Box>
    </Container>
  )
}

export default Board
