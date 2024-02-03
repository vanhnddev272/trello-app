import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddIcon from '@mui/icons-material/Add'
import AddCardIcon from '@mui/icons-material/AddCard'
import CloseIcon from '@mui/icons-material/Close'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ListCards from './ListCards/ListCards'
import { toast } from 'react-toastify'
import { Card as MuiCard } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'

function Columns({ column, createNewCard, deleteColumn }) {
  const orderedCards = column.cards
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: column._id, data: { ...column } })
  const dndKitColumnsStyle = {
    // touchAction: 'none', //For PointerSensor type
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const [newCardTitle, setNewCardTitle] = useState('')
  const [isOpenAddNewCard, setIsOpenAddNewCard] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const toggleOpenAddNewCard = () => setIsOpenAddNewCard(!isOpenAddNewCard)

  const addNewCard = () => {
    if (!newCardTitle) {
      toast.warn('🦄 Please provide a new card title!')
      return
    }

    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    createNewCard(newCardData)
    toast.success('Added new card!')

    toggleOpenAddNewCard()
    setNewCardTitle('')
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const confirmDeleteColumn = useConfirm()
  const deleteThisColumn = () => {
    confirmDeleteColumn({
      title: 'Delete Column?',
      description: 'This action will permanently delete your column and its cards! Are you sure?'
      // dialogProps: { maxWidth: 'xs' },
      // buttonOrder: ['confirm', 'cancel']
      // confirmationKeyword: `${column.title}`
    })
      .then(() => {
        deleteColumn(column._id)

        toast.success('Column deleted successfully!')
      })
      .catch(() => {})
  }

  return (
    <div
      ref={setNodeRef}
      style={dndKitColumnsStyle} {...attributes} >
      <Box {...listeners}
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101204' : '#f1f2f4'),
          height: 'fit-content',
          minWidth: '272px',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(4)} )`,
          maxWidth: '272px',
          p: '0 0 8px',
          borderRadius: '12px'
        }}>
        <Box sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p: '8px 8px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          columnGap: '4px'
        }}>
          <Typography
            sx={{
              p: '6px 8px 6px 12px',
              textTransform: 'uppercase',
              fontSize: '14px',
              fontWeight: 500
            }}>
            {column?.title}
          </Typography>
          <IconButton
            sx={{
              color: (theme) => (theme.palette.mode === 'dark' ? '#9fadbc' : '#44546f'),
              width: '32px',
              height: '32px',
              p: '6px',
              borderRadius: '8px',
              '&:hover ': {
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#A6C5E229' : '#091E4224'),
                color: (theme) => (theme.palette.mode === 'dark' ? '#B6C2CF' : '#172b4d')
              }
            }}
            id="basic-column-dropdown"
            aria-controls={open ? 'basic-menu-dropdown' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
            <MoreHorizIcon sx={{ fontSize: '18px' }}/>
          </IconButton>
          <Menu
            id="basic-menu-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClick={handleClose}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-column-dropdown'
            }}
          >
            <Paper sx={{
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#282e33' : 'white'),
              width: 300,
              padding: '4px 0 12px',
              borderRadius: '8px'
            }}>
              <Box
                data-no-dnd="true"
                sx={{
                  height: (theme) => theme.trello.columnFooterHeight,
                  p: '0 8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 500,
                    flexGrow: '1'
                  }}>List actions
                </Typography>
                <IconButton
                  sx={{
                    color: (theme) => (theme.palette.mode === 'dark' ? '#9fadbc' : '#44546f'),
                    width: '34px',
                    height: '34px',
                    p: '6px',
                    justifySelf: 'flex-end',
                    borderRadius: '8px',
                    position: 'absolute',
                    right: '8px',
                    '&:hover ': {
                      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#A6C5E229' : '#091E4224'),
                      color: (theme) => (theme.palette.mode === 'dark' ? '#B6C2CF' : '#172b4d')
                    }
                  }}
                >
                  <CloseIcon sx={{ fontSize: '20px' }} />
                </IconButton>
              </Box>
              <MenuList dense>
                <MenuItem>
                  <ListItemText onClick={toggleOpenAddNewCard}>Add card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText >Copy list</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText >Move list</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText >Watch</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemText>Sort by...</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemText sx={{
                    '& .MuiTypography-root': {
                      fontSize: '12px',
                      fontWeight: 500,
                      padding: '8px 0 0',
                      margin: '0 0 8px'
                    }
                  }}>
                    Automation
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText >When a card is added to the list…</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText >Every day, sort list by...</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText >Every Monday, sort list by...</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText >Create a rule</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemText>Move all card in this list</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>Archive all card in this list</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={deleteThisColumn}>
                  <ListItemText>Delete this column</ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
          </Menu>
        </Box>

        <ListCards cards={orderedCards} />

        {!isOpenAddNewCard
          ? <Box
            data-no-dnd="true"
            sx={{
              height: (theme) => theme.trello.columnFooterHeight,
              p: '0 8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Button
              variant='text'
              onClick={toggleOpenAddNewCard}
              startIcon={<AddIcon />}
              sx={{
                color: (theme) => (theme.palette.mode === 'dark' ? '#9fadbc' : '#44546f'),
                padding: '6px 12px 6px 8px',
                justifyContent: 'flex-start',
                flexGrow: 2,
                borderRadius: '8px',
                '&:hover ': {
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#A6C5E229' : '#091E4224'),
                  color: (theme) => (theme.palette.mode === 'dark' ? '#B6C2CF' : '#172b4d')
                }
              }} >
                Add a card
            </Button>
            <IconButton
              sx={{
                color: (theme) => (theme.palette.mode === 'dark' ? '#9fadbc' : '#44546f'),
                width: '32px',
                height: '32px',
                p: '6px',
                borderRadius: '8px',
                '&:hover ': {
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#A6C5E229' : '#091E4224'),
                  color: (theme) => (theme.palette.mode === 'dark' ? '#B6C2CF' : '#172b4d')
                }
              }}
              id="basic-column-dropdown"
              aria-controls={open ? 'basic-menu-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}>
              <AddCardIcon sx={{ fontSize: '16px' }} />
            </IconButton>
          </Box>
          : <Box
            data-no-dnd="true"
            sx={{
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101204' : '#f1f2f4'),
              height: 'fit-content',
              maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(4)} )`,
              minWidth: '272px',
              maxWidth: '272px',
              p: '4px 8px 8px',
              alignItems: 'center',
              borderRadius: '12px'
            }}>
            <MuiCard sx={{
              borderRadius: '8px',
              overflow: 'unset',
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#22272B' : 'white')
            }}>
              <TextField
                autoFocus
                hiddenLabel
                id="outlined-size-small"
                placeholder='Enter title for this card'
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addNewCard()
                }}
                sx={{
                  width: '100%',
                  '& input': {
                    color: (theme) => (theme.palette.mode === 'dark' ? '#b6c2cf' : ''),
                    padding: '6px 12px',
                    fontSize: '14px',
                    '&::placeholder': {
                      color: (theme) => (theme.palette.mode === 'dark' ? '#b6c2cf' : '')
                    }
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { borderColor: '#091e4240' },
                    '&.Mui-focused fieldset': { border: '2px solid #388bff' }
                  }
                }}
              />
            </MuiCard>
            <Box sx={{
              display: 'flex',
              marginTop: '8px',
              gap: 0.5
            }}>
              <Button
                variant='text'
                onClick={addNewCard}
                sx={{
                  color: (theme) => (theme.palette.mode === 'dark' ? '#1d2125' : 'white'),
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#579dff' : '#0c66e4'),
                  padding: '6px 12px',
                  '&:hover ': { bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#85b8ff' : '#0055cc') }
                }} >
                Add card
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
                onClick={toggleOpenAddNewCard}>
                <CloseIcon sx={{ fontSize: '20px' }} />
              </IconButton>
            </Box>
          </Box>
        }
      </Box>
    </div>
  )
}

export default Columns
