// import { cyan, deepPurple, lightGreen, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  trello: {
    appBarHeight: '54px',
    boardBarHeight: '62px'
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '4px',
            height: '4px'
          },
          '*::-webkit-scrollbar-thumb': {
            // backgroundColor: ''
            borderRadius: '4px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            // backgroundColor: ''
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 'normal',
          lineHeight: 1.5
          // fontFamily: [
          //   '-apple-system',
          //   'BlinkMacSystemFont',
          //   '"Segoe UI"',
          //   'Roboto',
          //   '"Helvetica Neue"',
          //   'Arial',
          //   'sans-serif',
          //   '"Apple Color Emoji"',
          //   '"Segoe UI Emoji"',
          //   '"Segoe UI Symbol"'
          // ].join(',')
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          // color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.main
          //   }
          // }
          '& fieldset': { borderWidth: '0.5px !important' },
          '&:hover fieldset': { borderWidth: '1px !important' },
          '&.Mui-focused': { borderWidth: '1px !important' }
        })
      }
    }
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: lightGreen
    //   }
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: deepPurple
    //   }
    // }
  }
})

export default theme
