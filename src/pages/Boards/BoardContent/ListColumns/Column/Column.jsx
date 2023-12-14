import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddIcon from '@mui/icons-material/Add'
import AddCardIcon from '@mui/icons-material/AddCard'
import CloseIcon from '@mui/icons-material/Close'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'


function Columns({ column }) {
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

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

  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
        {/* Board Header */}
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
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-column-dropdown'
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘X
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘C
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Paste</ListItemText>
              <Typography variant="body2" color="text.secondary">
                ⌘V
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Web Clipboard</ListItemText>
            </MenuItem>
          </Menu>
        </Box>

        {/* Board Content */}
        <ListCards cards={orderedCards} />

        {/* Board Footer */}
        {!isOpenAddNewCard
          ? <Box
            data-no-dnd="true"
            sx={{
              height: (theme) => theme.trello.columnFooterHeight,
              p: '8px 8px 0',
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
              p: '8px',
              alignItems: 'center',
              borderRadius: '12px'
            }}>
            <TextField
              autoFocus
              hiddenLabel
              id="outlined-size-small"
              placeholder='Enter list title ...'
              value={newCardTitle}
              size="small"
              onChange={(e) => setNewCardTitle(e.target.value)}
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
