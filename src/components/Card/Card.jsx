import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import SubjectIcon from '@mui/icons-material/Subject'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'


function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card._id, data: { ...card } })
  const dndKitCardStyle = {
    // touchAction: 'none', //For PointerSensor type
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  }

  const isShowCardAction = () => {
    return !!card?.description || !!card?.attachments
  }

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyle} {...attributes} {...listeners}
      sx={{
        borderRadius: '8px',
        overflow: 'unset',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#22272B' : 'white'),
        '&:hover': { outline: '2px solid #388bff' },
        display: card?.FE_PlaceholderCard ? 'none' : 'block'
      }}>
      {card?.cover && <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={card?.cover}
      />}
      <CardContent>
        <Box sx={{ my: '4px' }}>
          <Typography gutterBottom>
            {card?.title}
          </Typography>
        </Box>
        {isShowCardAction &&
          <Box sx={{
            display: 'flex',
            gap: 1,
            mb: '8px'
          }}>
            {card?.description &&
              <SubjectIcon sx={{ fontSize: '16px' }}/>
            }
            {!!card?.attachments?.length &&
              <Chip sx={{
                width: '16px',
                height: '16px',
                ml: '7px',
                color: 'white',
                bgcolor: 'transparent',
                border: 'none'
              }}
              icon={<AttachmentIcon sx={{ width: '16px', height: '16px' }}/> }
              label={card?.attachments.length}
              />
            }
          </Box>
        }
      </CardContent>
      {/* <CardActions>
      </CardActions> */}
    </MuiCard>
  )
}

export default Card
