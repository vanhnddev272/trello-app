// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import theme from '~/theme.js'
import { Provider } from 'react-redux'
import { store } from './redux/store'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme} >
    <CssBaseline />
    <App />
    <ToastContainer
      autoClose={3000}
      position='bottom-right'
      theme='colored'
    />
  </CssVarsProvider>
  // </React.StrictMode>
)
