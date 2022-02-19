import '../styles/globals.css'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import { red } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import {themeOptions} from '../utils/theme'
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const theme = createTheme(themeOptions);

/*
const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});
*/


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
