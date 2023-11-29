import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      mt: '12px',
      p: '0 16px 12px'
    }}>
      {/* Column */}
      <ListColumns columns={orderedColumns} />
    </Box>
  )
}

export default BoardContent
