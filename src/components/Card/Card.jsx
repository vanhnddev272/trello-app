import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import { IconButton, Card as MuiCard } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import SubjectIcon from '@mui/icons-material/Subject'
import AttachmentIcon from '@mui/icons-material/Attachment'
import EditIcon from '@mui/icons-material/Edit'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import CardDetails from './CardDetails/CardDetails'


function Card({ card }) {
  const [isEditCard, setIsEditCard] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const isShowCardAction = () => {
    return !!card?.description || !!card?.attachments
  }
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card._id, data: { ...card } })
  const dndKitCardStyle = {
    // touchAction: 'none', //For PointerSensor type
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  }

  const openCardDetails = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyle} {...attributes} {...listeners}
      onMouseEnter={() => setIsEditCard(true)}
      onMouseLeave={() => setIsEditCard(false)}
      sx={{
        display: card?.FE_PlaceholderCard ? 'none' : 'block',
        position: 'relative',
        borderRadius: '8px',
        overflow: 'unset',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#22272B' : 'white'),
        '&:hover': { outline: '2px solid #388bff' }
      }}>
      <IconButton
        color="inherit"
        onClick={openCardDetails}
        sx={{
          color: '#ffffff',
          width: '32px',
          height: '32px',
          padding: '6px',
          borderRadius: '16px',
          display: isEditCard ? 'flex' : 'none',
          position: 'absolute',
          top: '2px',
          right: '2px',
          zIndex: 10,
          '&:hover ': {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#A6C5E229' : '#f1f2f4')
          }
        }}
      >
        <EditIcon sx={{ color: (theme) => (theme.palette.mode === 'dark' ? '#9fadbc' : '#44546f'), fontSize: '14px' }}/>
      </IconButton>
      {card?.cover && <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={card?.cover}
      />}
      <CardContent sx={{ padding: card.description || card.attachments ? '' : '4px 12px 0 !important' }}>
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
      <CardDetails open={openDialog} onClose={handleClose} />
    </MuiCard>
  )
}

export default Card
