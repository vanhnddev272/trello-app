import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import AppBar from '~/components/AppBar/AppBar.jsx'
import { useQuery } from '@tanstack/react-query'
import { getBoards } from '~/apis/index.js'

function HomePage() {
  const { data: boards } = useQuery({
    queryKey: 'boards',
    queryFn: async () => {
      return await getBoards()
    },
    staleTime: 5 * 60 * 1000
  })

  return (
    <Box>
      <AppBar/>
      <Box className={'max-w-[1280px] mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'}>
        {boards && boards.map((board) => (
          <Box key={board._id} className={'border border-gray-300 rounded-md'}>
            <Link to={`/${board._id}`}>
              <img src={board.background[board.background.length - 1]} alt={board.title} className={'w-full h-40 object-cover rounded-t-md'}/>
              <Box className={'p-3'}>
                <Box className={'text-lg font-bold'}>{board.title}</Box>
                <Box className={'text-sm text-gray-500'}>{board.description}</Box>
              </Box>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default HomePage
