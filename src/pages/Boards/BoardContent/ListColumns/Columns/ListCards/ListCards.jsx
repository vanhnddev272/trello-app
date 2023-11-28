import Box from '@mui/material/Box'
import Card from '~/components/Card/Card'

function ListCards() {
  return (
    <Box sx={{
      p: '0 4px 2px 4px',
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
      <Card />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
      <Card hideMedia />
    </Box>
  )
}

export default ListCards
