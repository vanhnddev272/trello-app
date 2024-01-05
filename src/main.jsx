// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'
import theme from '~/theme.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme} >
    <ConfirmProvider defaultOptions={{
      dialogProps: { maxWidth: 'xs' },
      buttonOrder: ['confirm', 'cancel']
    }}>
      <CssBaseline />
      <App />
      <ToastContainer
        autoClose={3000}
        position='bottom-right'
        theme='colored'
      />
    </ConfirmProvider>
  </CssVarsProvider>
  // </React.StrictMode>
)
