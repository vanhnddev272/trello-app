import Box from '@mui/material/Box'
import ModeSelect from '../ModeSelect'


function AppBar() {
  return (
    <Box sx={{
      backgroundColor: '#ffd740',
      width: '100%',
      height: (theme) => theme.trello.navBarHeight,
      display: 'flex',
      alignItems: 'center'
    }}>
      <ModeSelect />
    </Box>
  )
}

export default AppBar