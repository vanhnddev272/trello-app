import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      mt: '12px',
      p: '0 16px 12px'
    }}>
      {/* Column */}
      <ListColumns />
    </Box>
  )
}

export default BoardContent
