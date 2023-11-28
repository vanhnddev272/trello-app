import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import SubjectIcon from '@mui/icons-material/Subject'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ hideMedia }) {
  if (hideMedia) {
    return (
      <MuiCard sx={{ borderRadius: '8px', overflow: 'unset' }}>
        <CardContent>
          <Box sx={{ mb: '4px' }}>
            <Typography gutterBottom>New Card</Typography>
          </Box>
        </CardContent>
        {/* <CardActions>
        </CardActions> */}
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{ borderRadius: '8px', overflow: 'unset' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/src/assets/bg.png"
      />
      <CardContent>
        <Box sx={{ mb: '4px' }}>
          <Typography gutterBottom>My First Card</Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          gap: 1,
          mb: '8px'
        }}>
          <SubjectIcon sx={{ fontSize: '16px' }}/>
          <AttachmentIcon sx={{ fontSize: '16px' }}/>
        </Box>
      </CardContent>
      {/* <CardActions>
      </CardActions> */}
    </MuiCard>
  )
}

export default Card
