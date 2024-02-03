import { useState } from 'react'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import AvatarGroup from '@mui/material/AvatarGroup'
import TextField from '@mui/material/TextField'
// import { Skeleton } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'
import { updateBoardAPI } from '~/apis'
import BoardMenu from '~/pages/Boards/BoardMenu/BoardMenu'

const CHIP_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  px: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: '#A6C5E229'
  }
}

function BoardBar({ loading, board }) {

  const [isEditing, setIsEditing] = useState(false)
  const [boardTitle, setBoardTitle] = useState(board?.title)

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = async () => {
    await updateBoardAPI(board._id, { title: boardTitle })
    setBoardTitle(boardTitle)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setBoardTitle(e.target.value)
  }


  return (
    // (loading ? (
    //   <Skeleton animation="wave" variant="rectangular" sx={{ width: '100%', height: (theme) => theme.trello.boardBarHeight }}/>
    // ) : (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 2,
      gap: 2,
      overflowX: 'auto',
      borderTop: '1px solid #31383d',
      backgroundColor: 'rgba(0, 0, 0, .3)'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1, gap: 0.5 }}>
        <Box>
          {isEditing ? (
            <TextField
              autoFocus
              id="filled-hidden-label-small"
              value={boardTitle}
              onBlur={handleBlur}
              onChange={handleChange}
              size="small"
              variant="outlined"
              sx={{
                boxSizing: 'border-box',
                width: 'fit-content',
                height: '100%',
                '& input': {
                  textAlign: 'center',
                  color: 'black',
                  bgcolor: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  p: '2px 8px'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { borderColor: '#091e4240' },
                  '&.Mui-focused fieldset': { border: '2px solid #388bff' }
                }
              }}
            />
          ) : (
            <Chip
              sx={{
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                bgcolor: 'transparent',
                border: 'none',
                px: '5px',
                borderRadius: '4px',
                '& .MuiSvgIcon-root': {
                  color: 'white'
                },
                '&:hover': {
                  bgcolor: '#A6C5E229'
                } }}
              label={boardTitle}
              clickable
              onClick={handleClick}
            />
          )}
        </Box>
        <Button sx={{ '& .MuiButtonBase-root': {
          minWidth: 'min-content',
          width: 24,
          height: 24,
          p: 0
        } }}>
          <StarBorderIcon sx={{ color: 'white' }} />
        </Button>
        <Chip
          sx={CHIP_STYLE}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable />
        <Chip
          sx={CHIP_STYLE}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Chip
          sx={CHIP_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          clickable />
        <Chip
          sx={CHIP_STYLE}
          icon={<FilterListIcon />}
          label="Filter"
          clickable />
        <Box
          sx={{
            borderLeft: '1px solid gray',
            height: 16,
            margin: '8 4'
          }}></Box>
        <Button
          variant='text'
          startIcon={<PersonAddIcon />}
          sx={{
            color: '#172b4d',
            bgcolor: '#DFE1E6',
            padding: '6px 12px',
            '&:hover ': { bgcolor: 'white' }
          }} >
          Invite
        </Button>
        <AvatarGroup
          sx={{
            marginRight: '4px',
            gap: 0.5,
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              '&:first-of-type': {
                bgcolor: '#a4b0be'
              }
            }
          }}
          total={10} >
          <Tooltip title='Remy Sharp'>
            <Avatar alt="Trevor Henderson" src='https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHdvbWFufGVufDB8fDB8fHww' />
          </Tooltip>
          <Tooltip title='Travis Howard'>
            <Avatar alt="Travis Howard" src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D' />
          </Tooltip>
          <Tooltip title='Agnes Walker'>
            <Avatar alt="Agnes Walker" src='https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fHww' />
          </Tooltip>
          <Tooltip title='Trevor Henderson'>
            <Avatar alt="Remy Sharp" src='/src/assets/avt1.jpg' />
          </Tooltip>
        </AvatarGroup>
        <BoardMenu />
      </Box>
    </Box>
  )
  //   )
  // )
}

export default BoardBar
