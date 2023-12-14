import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import Auth from './pages/Auth'
import ErrorPage from './pages/ErrorPage/ErrorPage'

function App() {
  const router = createBrowserRouter([
    {
      path: '/:id',
      element: <Board />,
      errorElement: <ErrorPage />
    },
    {
      path: '/auth',
      element: <Auth />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
