import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { Tooltip } from '@mui/material'


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

function BoardBar() {
  const [isEditing, setIsEditing] = useState(false)
  const [boardTitle, setBoardTitle] = useState('Vanhnddev Board')

  const handleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setBoardTitle(e.target.value)
  }


  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 2,
      gap: 2,
      overflowX: 'auto',
      borderTop: '1px solid gray',
      backgroundColor: 'rgba(0, 0, 0, .3)'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box>
          {isEditing ? (
            <TextField
              autoFocus
              hiddenLabel
              id="filled-hidden-label-small"
              value={boardTitle}
              onBlur={handleBlur}
              onChange={handleChange}
              variant="filled"
              size="small"
              sx={{
                '& input': { color: 'white' }
              }}
            />
          ) : (
            <Chip
              sx={CHIP_STYLE}
              icon={<DashboardIcon />}
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
          label="Public/Private Workspace"
          clickable />
        <Chip
          sx={CHIP_STYLE}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable />
        {/* <Button sx={CHIP_STYLE} variant='text' startIcon={<PersonAddIcon />} >
          Public/Private Workspace
          </Button>
          <Button sx={CHIP_STYLE} variant='text' startIcon={<PersonAddIcon />} >
          Add to Google Drive
        </Button> */}
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
        {/* <Button sx={CHIP_STYLE} variant='text' startIcon={<PersonAddIcon />} >
          Automation
        </Button>
        <Button sx={CHIP_STYLE} variant='text' startIcon={<PersonAddIcon />} >
          Filter
        </Button> */}
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
            gap: 0.5,
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none'
            }
          }}
          total={10} >
          <Tooltip title='Remy Sharp'>
            <Avatar alt="Remy Sharp" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww' />
          </Tooltip>
          <Tooltip title='Travis Howard'>
            <Avatar alt="Travis Howard" src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D' />
          </Tooltip>
          <Tooltip title='Agnes Walker'>
            <Avatar alt="Agnes Walker" src='https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fHww' />
          </Tooltip>
          <Tooltip title='Trevor Henderson'>
            <Avatar alt="Trevor Henderson" src='https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHdvbWFufGVufDB8fDB8fHww' />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
