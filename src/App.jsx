import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import Auth from './pages/Auth'
import HomePage from './pages/HomePage/HomePage'
// import ErrorPage from './pages/ErrorPage/ErrorPage'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/:id',
      element: <Board />
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
