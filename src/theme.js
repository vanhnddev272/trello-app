// import { cyan, deepPurple, lightGreen, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '54px'
const BOARD_BAR_HEIGHT = '58px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT} - 12px)`
const COLUMN_HEADER_HEIGHT = '46px'
const COLUMN_FOOTER_HEIGHT = '48px'
const BOARD_MENU_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT})`
const BOARD_MENU_TITLE_HEIGHT = '54px'

const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
    boardMenuHeight: BOARD_MENU_HEIGHT,
    boardMenuTitleHeight: BOARD_MENU_TITLE_HEIGHT
  },
  typography: {
    fontSize: 14,
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
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#C5C9D1',
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
          fontWeight: 500,
          lineHeight: '22px'
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
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.mode === 'dark' ? '#b6c2cf' : '',
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
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
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 1px #091E4240, 0px 0px 1px #091E424F'
        }
      }
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '8px 12px 4px',
          '&:last-child': { paddingBottom: '4px' }
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        img: {
          height: 'auto'
        }
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
