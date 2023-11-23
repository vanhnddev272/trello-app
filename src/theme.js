import { cyan, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  trello: {
    navBarHeight: '48px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal
      }
    },
    dark: {
      palette: {
        primary: cyan
      }
    }
  // ...other properties
  }
})

export default theme