import '../styles/globals.css'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {themeOptions} from '../utils/theme'

const theme = createTheme({themeOptions});


function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps}/>
    </ThemeProvider>
  )
}

export default MyApp
