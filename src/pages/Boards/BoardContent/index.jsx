import Box from '@mui/material/Box'
function BoardContent() {
  return (
    <Box sx={{
      backgroundColor: 'secondary.A400',
      width: '100%',
      height: (theme) => `calc(100vh - ${theme.trello.navBarHeight} - ${theme.trello.boardBarHeight})`,
      display: 'flex',
      alignItems: 'center'
    }}>
      Board Item
    </Box>
  )
}

export default BoardContent
