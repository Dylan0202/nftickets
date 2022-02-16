import '../styles/globals.css'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {themeOptions} from '../utils/theme'
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const theme = createTheme({themeOptions});


function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <CssBaseline />
        <Component {...pageProps}/>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default MyApp
