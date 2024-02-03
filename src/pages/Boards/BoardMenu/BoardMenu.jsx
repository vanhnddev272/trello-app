import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuList from '@mui/material/MenuList'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import ListAltIcon from '@mui/icons-material/ListAlt'
import BallotIcon from '@mui/icons-material/Ballot'
import SettingsIcon from '@mui/icons-material/Settings'
import AssignmentIcon from '@mui/icons-material/Assignment'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import LabelIcon from '@mui/icons-material/Label'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import PostAddIcon from '@mui/icons-material/PostAdd'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import ShareIcon from '@mui/icons-material/Share'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import { useState } from 'react'
import { Avatar } from '@mui/material'

function CustomButton (props) {
  const { title, icon } = props
  return (
    <Button
      variant='text'
      startIcon={icon}
      sx={{
        color: (theme) => (theme.palette.mode === 'dark' ? '#9fadbc' : '#44546f'),
        justifyContent: 'flex-start',
        flexGrow: 2,
        padding: '6px 16px',
        borderRadius: '8px',
        '&:hover ': {
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#A6C5E229' : '#091E4224'),
          color: (theme) => (theme.palette.mode === 'dark' ? '#B6C2CF' : '#172b4d')
        }
      }} >
      {title}
    </Button>
  )
}

function BoardMenu() {
  const drawerWidth = 340
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    (open === false ? (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          color: '#ffffff',
          width: '32px',
          height: '32px',
          padding: '6px',
          borderRadius: '4px',
          '&:hover ': {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#A6C5E229' : '#091E4224')
          }
        }}
      >
        <MoreHorizIcon sx={{ fontSize: '18px' }}/>
      </IconButton>
    ) : (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            height: (theme) => theme.trello.boardMenuHeight,
            boxSizing: 'border-box',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#282E33' : 'white'),
            top: 'unset',
            bottom: 0,
            padding: '0 12px 8px'
          }
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Box
          sx={{
            height: (theme) => theme.trello.boardMenuTitleHeight,
            p: '0 12px',
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
              fontSize: '16px !important',
              fontWeight: 500,
              flexGrow: '1'
            }}>
              Menu
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
            onClick={handleDrawerClose}
          >
            <CloseIcon sx={{ fontSize: '20px' }} />
          </IconButton>
        </Box>
        <Divider />
        <MenuList sx={{ display: 'flex', flexDirection: 'column', padding: '12px 0', gap: '4px' }}>
          <CustomButton title='About this board' icon={<InfoIcon />} />
          <CustomButton title='Activity' icon={<ListAltIcon />} />
          <CustomButton title='Archived items' icon={<BallotIcon />} />
          <Divider />
          <CustomButton title='Settings' icon={<SettingsIcon />} />
          <CustomButton title='Change background' icon={<Avatar variant='square' src='/src/assets/bg2.png' />} />
          <CustomButton title='Custom Fields' icon={<AssignmentIcon />} />
          <CustomButton title='Automation' icon={<SmartToyIcon />} />
          <CustomButton title='Power-Ups' icon={<TrendingUpIcon />} />
          <CustomButton title='Labels' icon={<LabelIcon />} />
          <CustomButton title='Stickers' icon={<TagFacesIcon />} />
          <CustomButton title='Make template' icon={<PostAddIcon />} />
          <Divider />
          <CustomButton title='Watch' icon={<VisibilityIcon />} />
          <CustomButton title='Copy board' icon={<ContentCopyIcon />} />
          <CustomButton title='Email-to-board' icon={<MailOutlineIcon />} />
          <CustomButton title='Print, export and share' icon={<ShareIcon />} />
          <CustomButton title='Close board' icon={<HorizontalRuleIcon />} />
        </MenuList>
      </Drawer>

    ))
  )
}

export default BoardMenu