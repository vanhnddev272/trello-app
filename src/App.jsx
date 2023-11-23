import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import ModeSelect from './components/ModeSelect'

function App() {

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary.main' }}>
      <Box sx={{
        backgroundColor: '#ffd740',
        width: '100%',
        height: (theme) => theme.trello.navBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        <ModeSelect />
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Bar
      </Box>
      <Box sx={{
        backgroundColor: '#00e676',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trello.navBarHeight} - ${theme.trello.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Item
      </Box>
    </Container>
  )
}

export default App
