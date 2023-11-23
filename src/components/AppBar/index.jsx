import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import ModeSelect from '~/components/ModeSelect'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as TrelloLogo } from '~/assets/trello.svg'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Tooltip from '@mui/material/Tooltip'
import Workspace from './Menus/Workspace'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Profiles from './Menus/Profiles'


function AppBar() {
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.navBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto'
      
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <AppsIcon sx={{ color: 'primary.main' }}/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloLogo} inheritViewBox sx={{ color: 'primary.main' }} />
          <Typography sx={{ color: 'primary.main', fontSize: '1.3rem', fontWeight: 'bold' }}>Trello</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspace />
          <Recent />
          <Starred />
          <Templates />
          <Button variant='outlined'>
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <TextField id="outlined-search" label="Search..." type="search" size='small' sx={{ minWidth: 120 }}/>
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge color="primary" variant="dot">
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
        <HelpOutlineIcon />
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
