import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

function HomePage() {
  const boardId = '657ca1fb3346ae48f9e0bd8c'
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '16px'
    }}>
      <Link to={`/${boardId}`}>Go to board</Link>
    </Box>
  )
}

export default HomePage
