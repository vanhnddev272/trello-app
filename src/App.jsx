import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import Login from './pages/Login'
import Register from './pages/Register'
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
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
