import Box from '@mui/material/Box'
import Columns from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

function ListColumns({ columns }) {

  const [isOpenAddNewColumn, setIsOpenAddNewColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const toggleOpenAddNewColumn = () => setIsOpenAddNewColumn(!isOpenAddNewColumn)

  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.warn('🦄 Please provide a new column title!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    }

    toast.success('Added new column!')
    toggleOpenAddNewColumn()
    setNewColumnTitle('')
  }

  return (
    <SortableContext items={columns?.map(column => ({ id: column._id }))} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        width: '100%',
        height: '100%',
        pl: '12px',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        gap: 2
      }}>

        {columns?.map((column, index) => <Columns key={index} column={column} /> )}

        {!isOpenAddNewColumn
          ? <Box>
            <Button
              variant='text'
              startIcon={<AddIcon />}
              onClick={toggleOpenAddNewColumn}
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
                  Add another list
            </Button>
          </Box>
          : <Box sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101204' : '#f1f2f4'),
            height: 'fit-content',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(4)} )`,
            minWidth: '272px',
            maxWidth: '272px',
            p: '8px',
            mb: '8px',
            alignItems: 'center',
            borderRadius: '12px'
          }}>
            <TextField
              autoFocus
              hiddenLabel
              id="outlined-size-small"
              placeholder='Enter list title ...'
              value={newColumnTitle}
              size="small"
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                width: '100%',
                '& input': {
                  color: (theme) => (theme.palette.mode === 'dark' ? '#b6c2cf' : ''),
                  padding: '6px 12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  '&::placeholder': {
                    color: (theme) => (theme.palette.mode === 'dark' ? '#b6c2cf' : 'black')
                  }
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { borderColor: '#091e4240' },
                  '&.Mui-focused fieldset': { border: '2px solid #388bff' }
                }
              }}
            />
            <Box sx={{
              display: 'flex',
              marginTop: '8px',
              gap: 0.5
            }}>
              <Button
                variant='text'
                onClick={addNewColumn}
                sx={{
                  color: (theme) => (theme.palette.mode === 'dark' ? '#1d2125' : 'white'),
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#579dff' : '#0c66e4'),
                  padding: '6px 12px',
                  '&:hover ': { bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#85b8ff' : '#0055cc') }
                }} >
                Add list
              </Button>
              <IconButton
                sx={{
                  color: (theme) => (theme.palette.mode === 'dark' ? '#9fadbc' : '#44546f'),
                  width: '34px',
                  height: '34px',
                  p: '6px',
                  borderRadius: '8px',
                  '&:hover ': {
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#A6C5E229' : '#091E4224'),
                    color: (theme) => (theme.palette.mode === 'dark' ? '#B6C2CF' : '#172b4d')
                  }
                }}
                onClick={toggleOpenAddNewColumn}>
                <CloseIcon sx={{ fontSize: '20px' }} />
              </IconButton>
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns
