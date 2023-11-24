//Board Details
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import Box from '@mui/material/Box'
import bg from '~/assets/bg1.png'

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <Box
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <BoardBar />
        <BoardContent />
      </Box>
    </Container>
  )
}

export default Board
