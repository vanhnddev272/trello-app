import Box from '@mui/material/Box'
import Columns from './Columns/Columns'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

function ListColumns() {

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      gap: 2
    }}>
      <Columns />
      <Columns />

      <Button
        variant='text'
        startIcon={<AddIcon />}
        sx={{
          color: 'white',
          bgcolor: '#ffffff3d',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(4)} )`,
          minWidth: '272px',
          maxWidth: '272px',
          p: '12px',
          mb: '8px',
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderRadius: '12px',
          '&:hover': {
            bgcolor: '#a6c5e229'
          }
        }}>
          Add new list
      </Button>
    </Box>
  )
}

export default ListColumns
