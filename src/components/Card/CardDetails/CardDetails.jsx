import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import SubjectIcon from '@mui/icons-material/Subject'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CloseIcon from '@mui/icons-material/Close'
import PersonIcon from '@mui/icons-material/Person'
import ChecklistIcon from '@mui/icons-material/Checklist'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AttachmentIcon from '@mui/icons-material/Attachment'
import WallpaperIcon from '@mui/icons-material/Wallpaper'
import ListAltIcon from '@mui/icons-material/ListAlt'
import EastIcon from '@mui/icons-material/East'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddCardIcon from '@mui/icons-material/AddCard'
import ArchiveIcon from '@mui/icons-material/Archive'
import ShareIcon from '@mui/icons-material/Share'
import LabelIcon from '@mui/icons-material/Label'
import AddIcon from '@mui/icons-material/Add'
import InfoIcon from '@mui/icons-material/Info'
import Grid from '@mui/material/Unstable_Grid2'
import styled from '@emotion/styled'

function CustomButton (props) {
  const { title, icon } = props
  return (
    <Button
      variant='text'
      startIcon={icon}
      sx={{
        width: '100%',
        color: (theme) => theme.palette.mode === 'dark' ? '#b6c2cf' : '#44546f',
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#a1bdd914' : '#091e420f',
        padding: '6px 12px',
        margin: '8px 0 0',
        '&.MuiButton-root': {
          justifyContent: 'unset',
          '*::-webkit-justify-content': 'unset'
        },
        '&:hover ': {
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#a6c5e229' : '#dfe1e6'
        }
      }} >
      {title}
    </Button>
  )
}

function CardDetails({ column, card, open, onClose }) {

  const handleClose = () => {
    onClose()
  }
  let addToCardBtn = [
    {
      'title': 'Member',
      'icon': <PersonIcon />
    },
    {
      'title': 'Labels',
      'icon': <LabelIcon />
    },
    {
      'title': 'Checklist',
      'icon': <ChecklistIcon />
    },
    {
      'title': 'Dates',
      'icon': <AccessTimeIcon />
    },
    {
      'title': 'Attachment',
      'icon': <AttachmentIcon />
    },
    {
      'title': 'Cover',
      'icon': <WallpaperIcon />
    },
    {
      'title': 'Custom Fields',
      'icon': <ListAltIcon />
    }
  ]

  let actionsBtn = [
    {
      'title': 'Move',
      'icon': <EastIcon />
    },
    {
      'title': 'Copy',
      'icon': <ContentCopyIcon />
    },
    {
      'title': 'Make template',
      'icon': <AddCardIcon />
    },
    {
      'title': 'Archive',
      'icon': <ArchiveIcon />
    },
    {
      'title': 'Share',
      'icon': <ShareIcon />
    }
  ]


  if (card.cover) {
    addToCardBtn = addToCardBtn.filter(card => card.title !== 'Cover')
  }

  return (
    <Dialog fullWidth scroll='body' open={open} onClose={handleClose} PaperProps={{
      sx: {
        maxWidth: '792px',
        marginY: '54px',
        marginX: 'unset',
        alignItems: 'unset',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#343a40' : 'white'),
        borderRadius: '12px',
        backgroundImage: 'unset',
        position: 'relative'
      }
    }} sx={{
      '& .MuiDialog-container': {
        alignItems: 'unset',
        '*::-webkit-align-items': 'unset'
      },
      '& .MuiDialogTitle-root': { padding: '8px 16px !important' }
    }}>
      <IconButton
        color="inherit"
        onClick={handleClose}
        sx={{
          color: '#ffffff',
          width: '32px',
          height: '32px',
          padding: '12px',
          margin: '12px',
          borderRadius: '16px',
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 10,
          '&:hover ': {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#A6C5E229' : '#f1f2f4')
          }
        }}
      >
        <CloseIcon sx={{ color: (theme) => (theme.palette.mode === 'dark' ? '#9fadbc' : '#44546f') }}/>
      </IconButton>
      {card?.cover && <CardMedia
        component="img"
        alt="green iguana"
        height="160"
        image={card?.cover}
      />}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} disableEqualOverflow>
          {/* Title */}
          <Grid xs={12}>
            <Box sx={{ padding: '8px 18px', marginBottom: '8px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <CreditCardIcon />
                <DialogTitle sx={{
                }}>{card?.title}</DialogTitle>
              </Box>
              <Box sx={{ display: 'inline-flex', gap: '4px' }}>
                <Typography sx={{ paddingLeft: '40px' }}>in list</Typography>
                <Typography sx={{ textTransform: 'uppercase', textDecorationLine: 'underline' }}>{column?.title}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid sx={{ padding: '8px 8px 8px 24px' }} xs={9}>
            {/* Tag */}
            <Box sx={{ paddingLeft: '48px', marginBottom: '24px' }}>
              <Typography sx={{ fontSize: '12px !important', fontWeight: 500, margin: '0 8px 4px 0' }}>Notifications</Typography>
              <Button
                variant='text'
                startIcon={<VisibilityIcon />}
                sx={{
                  color: (theme) => theme.palette.mode === 'dark' ? '#b6c2cf' : '#44546f',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? '#a1bdd914' : '#091e420f',
                  padding: '6px 12px',
                  '&:hover ': {
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#a6c5e229' : '#dfe1e6'
                  }
                }} >
                Watch
              </Button>
            </Box>
            {/* Description */}
            <Box sx={{ marginBottom: '24px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SubjectIcon />
                  <Typography variant='h6' sx={{ fontSize: '16px', padding: '8px 16px' }}>Description</Typography>
                </Box>
                {card?.description &&
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button sx={{
                      color: (theme) => theme.palette.mode === 'dark' ? '#b6c2cf' : '#44546f',
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#a1bdd914' : '#091e420f',
                      padding: '6px 12px',
                      '&:hover ': {
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#a6c5e229' : '#dfe1e6'
                      }
                    }}>Edit</Button>
                  </Box>}
              </Box>
              {card?.description
                ? <Typography sx={{ paddingLeft: '40px' }}>{card?.description}</Typography>
                : <Box sx={{ paddingLeft: '40px' }}>
                  <TextField
                    hiddenLabel
                    placeholder='Add a more detailed description...'
                    maxRows={2}
                    // value={newCardTitle}
                    // onChange={(e) => setNewCardTitle(e.target.value)}
                    // onKeyDown={(e) => {
                    //   if (e.key === 'Enter') addNewCard()
                    // }}
                    sx={{
                      width: '100%',
                      '& input': {
                        height: '54px',
                        bgcolor: '#A1BDD914',
                        color: (theme) => (theme.palette.mode === 'dark' ? '#b6c2cf' : ''),
                        padding: '6px 12px',
                        fontSize: '14px',
                        '&::placeholder': {
                          color: (theme) => (theme.palette.mode === 'dark' ? 'white' : ''),
                          fontWeight: 500
                        },
                        '&:hover': {
                          bgcolor: '#A6C5E229'
                        }
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { border: 'none' }
                      }
                    }}
                  />
                </Box>}

            </Box>
            {/* Attachment */}
            {card?.attachments &&
              <Box sx={{ marginBottom: '24px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AttachmentIcon />
                    <Typography variant='h6' sx={{ fontSize: '16px', padding: '8px 16px' }}>Attachments</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button sx={{
                      color: (theme) => theme.palette.mode === 'dark' ? '#b6c2cf' : '#44546f',
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#a1bdd914' : '#091e420f',
                      padding: '6px 12px',
                      '&:hover ': {
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#a6c5e229' : '#dfe1e6'
                      }
                    }}>Add</Button>
                  </Box>
                </Box>
                <Box sx={{ paddingLeft: '40px' }}>
                  <Card sx={{ display: 'flex', bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#343A40' : 'white') }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      image={card?.cover}
                      sx={{ width: '112px', height: '96px' }}
                    />
                    <CardContent sx={{ padding: '8px 8px 8px 16px' }}>
                      <Typography sx={{ fontWeight: 700 }}>Name of attachment</Typography>
                      <Box sx={{ display: 'inline-flex', gap: '4px' }}>
                        <Typography>Added ...</Typography>
                        <Typography>•</Typography>
                        <Typography sx={{ textDecorationLine: 'underline' }}>Comment</Typography>
                        <Typography>•</Typography>
                        <Typography sx={{ textDecorationLine: 'underline' }}>Delete</Typography>
                        <Typography>•</Typography>
                        <Typography sx={{ textDecorationLine: 'underline' }}>Edit</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CreditCardIcon sx={{
                          fontSize: '16px',
                          color: (theme) => (theme.palette.mode === 'dark' ? '#9fadbc' : '#44546f')
                        }}/>
                        <Typography sx={{ textDecorationLine: 'underline' }}>Make cover</Typography>
                        <Typography sx={{ textDecorationLine: 'underline' }}>Remove cover</Typography>
                      </Box>
                    </CardContent>
                  </Card>

                </Box>
              </Box>}
            {/* Activity */}
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '0 0 12px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormatListBulletedIcon />
                <Typography variant='h6' sx={{ fontSize: '16px', padding: '8px 16px' }}>Activity</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button sx={{
                  color: (theme) => theme.palette.mode === 'dark' ? '#b6c2cf' : '#44546f',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? '#a1bdd914' : '#091e420f',
                  padding: '6px 12px',
                  '&:hover ': {
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#a6c5e229' : '#dfe1e6'
                  }
                }}>Show details</Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Avatar sx={{ width: 24, height: 24 }} alt='Vanh' src='/src/assets/avatar.jpg'/>
              <TextField
                hiddenLabel
                placeholder='Write a comment...'
                maxRows={2}
                // value={newCardTitle}
                // onChange={(e) => setNewCardTitle(e.target.value)}
                // onKeyDown={(e) => {
                //   if (e.key === 'Enter') addNewCard()
                // }}
                sx={{
                  width: '100%',
                  '& input': {
                    height: '24px',
                    bgcolor: '#A1BDD914',
                    color: (theme) => (theme.palette.mode === 'dark' ? '#b6c2cf' : ''),
                    padding: '6px 12px',
                    marginLeft: '16px',
                    fontSize: '14px',
                    '&::placeholder': {
                      color: (theme) => (theme.palette.mode === 'dark' ? 'white' : ''),
                      fontWeight: 500
                    },
                    '&:hover': {
                      bgcolor: '#A6C5E229'
                    }
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none' }
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid xs={3} sx={{ padding: '0 16px 0' }}>
            <Box sx={{ marginBottom: '24px' }}>
              <Typography sx={{ fontSize: '12px !important', fontWeight: 500, margin: '0 8px 0 0' }}>Add to card</Typography>
              {addToCardBtn.map(card => <CustomButton key={card.title} title={card.title} icon={card.icon} />)}
            </Box>
            <Box sx={{ marginBottom: '24px' }}>
              <Typography sx={{ fontSize: '12px !important', fontWeight: 500, margin: '0 8px 0 0' }}>Power-Ups</Typography>
              <Button
                variant='text'
                startIcon={<AddIcon />}
                sx={{
                  width: '100%',
                  color: (theme) => theme.palette.mode === 'dark' ? '#b6c2cf' : '#44546f',
                  padding: '6px 12px',
                  margin: '8px 0 0',
                  '&.MuiButton-root': {
                    justifyContent: 'unset',
                    '*::-webkit-justify-content': 'unset'
                  },
                  '&:hover ': {
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#a6c5e229' : '#dfe1e6'
                  }
                }} >
                Add Power-Ups
              </Button>
            </Box>
            <Box sx={{ marginBottom: '24px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '12px !important', fontWeight: 500, margin: '0 8px 0 0' }}>Automation</Typography>
                <IconButton
                  sx={{
                    padding: 0,
                    borderRadius: '16px',
                    '&:hover ': {
                      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#A6C5E229' : '#f1f2f4')
                    }
                  }}
                >
                  <InfoIcon sx={{
                    fontSize: '14px',
                    color: (theme) => (theme.palette.mode === 'dark' ? '#9fadbc' : '#44546f')
                  }}/>
                </IconButton>
              </Box>
              <Button
                variant='text'
                startIcon={<AddIcon />}
                sx={{
                  width: '100%',
                  color: (theme) => theme.palette.mode === 'dark' ? '#b6c2cf' : '#44546f',
                  padding: '6px 12px',
                  margin: '8px 0 0',
                  '&.MuiButton-root': {
                    justifyContent: 'unset',
                    '*::-webkit-justify-content': 'unset'
                  },
                  '&:hover ': {
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#a6c5e229' : '#dfe1e6'
                  }
                }} >
                Add button
              </Button>
            </Box>
            <Box sx={{ marginBottom: '24px' }}>
              <Typography sx={{ fontSize: '12px !important', fontWeight: 500, margin: '0 8px 0 0' }}>Add to card</Typography>
              {actionsBtn.map(card => <CustomButton key={card.title} title={card.title} icon={card.icon} />)}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )
}

export default CardDetails