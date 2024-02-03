import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

function CardDetails({ onClose, open }) {

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
    </Dialog>
  )
}
export default CardDetails