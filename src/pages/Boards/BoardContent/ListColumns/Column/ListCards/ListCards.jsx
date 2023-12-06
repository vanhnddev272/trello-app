import Box from '@mui/material/Box'
import Card from '~/components/Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function ListCards({ cards }) {
  return (
    <SortableContext items={cards?.map(column => column._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p: '4px',
        m: '2px 4px',
        height: (theme) => `calc(100% - ${theme.trello.columnHeaderHeight} - ${theme.trello.columnFooterHeight})`,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        maxHeight: (theme) => `calc(
          ${theme.trello.boardContentHeight} -
          ${theme.spacing(5)} -
          ${theme.trello.columnHeaderHeight} -
          ${theme.trello.columnFooterHeight}
        )`,
        overflowX: 'hidden',
        overflowY: 'auto'
      }}>
        {cards?.map(card => <Card key={card._id} card={card} />)}
      </Box>
    </SortableContext>
  )
}

export default ListCards
