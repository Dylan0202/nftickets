import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//Place this in Avatar <LockOutlinedIcon />
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import Alert from '@mui/material/Alert';
import {useRouter} from 'next/router'
import CardMedia from '@mui/material/CardMedia';
import ticketPic from '../../../public/nftickets.png'
import Image from 'next/image'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

//import { styled } from '@mui/system';

/* Example of styled component
const StyledTimePicker = styled(TimePicker)({
  backgroundColor: "white",
});
*/


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        NFTickets
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const copy = async (text) => {
  await navigator.clipboard.writeText(text);
  alert('Link copied, share it with your fans!');
}


export default function CreateEvent({makeEvent, loadingEvent, ticketUrl, confirmedEvent}) {

  const router = useRouter();


  const [dateValue, setDateValue] = React.useState(new Date());
  const [timeValue, setTimeValue] = React.useState(new Date());
  


  function goToLink(){
    router.push(ticketUrl)
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console

      let eventObj = {
        eventName: data.get('eventName'),
        vendorName: data.get('vendorName'),
        dateValue,
        timeValue,
        ticketNumber: data.get('ticketNo')
      };

      makeEvent(eventObj)

    };
    
    const handleDateChange = (newValue) => {
      setDateValue(newValue);
      console.log(dateValue)
    };

    const getButton = () =>{

      if(loadingEvent){

        return(
            <Button
            type="submit"
            fullWidth
            disabled
            variant="contained"
            sx={{ 
              maxWidth: "250px",
              mt: 3, 
              mb: 2 }}
        >
            Confirming Event... please wait
        </Button> 
        )

      } else if (confirmedEvent){

        return(
          null
        )

      } else {
        return (
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                maxWidth: "250px",
                mt: 3, 
                mb: 2 }}
          >
              Create Event NFTickets
          </Button>
        )
      }
    
    }

    return (
        <Container component="main" maxWidth = "xs" >
            <Card
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                backgroundColor: '#F5F5F5' 
                }}
            >
            <CardMedia sx={{mb:1}} title="NFTickets">
              <Image
                src={ticketPic}

                objectFit="contain" // or objectFit="cover"
              />
            </CardMedia>
              <Typography component="h1" variant="h5">
                Create Event
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                      <TextField
                          autoComplete="given-name"
                          name="vendorName"
                          required
                          fullWidth
                          id="vendorName"
                          label="Vendor/Artist Name"
                          autoFocus
                          sx ={{backgroundColor: "white"}} 
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <TextField
                          required
                          fullWidth
                          label="Event Name"
                          name="eventName"
                          sx ={{backgroundColor: "white"}}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx ={{backgroundColor: "white"}}  >
                        <DesktopDatePicker
                          label="Event Date"
                          inputFormat="MM/dd/yyyy"
                          value={dateValue}
                          onChange={ (newValue) => {
                            setDateValue(newValue);
                            console.log(newValue)
                          }}
                          sx ={{backgroundColor: "white"}} 
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6} >
                      <Box sx ={{backgroundColor: "white"}}  >
                        <TimePicker
                          label="Pick Time"
                          value={timeValue}
                          onChange={(newValue) => {
                            setTimeValue(newValue)
                            console.log(newValue);
                          }}
                          sx ={{backgroundColor: "white"}} 
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="ticketNo"
                        label="Number of Tickets"
                        type="number"
                        id="ticketNo"
                        sx ={{backgroundColor: "white"}}
                        defaultValue={0}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  {getButton()}
                </Grid> 
                </Box>
                  {confirmedEvent ?
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick = {()=> goToLink()}
                        sx={{ 
                          maxWidth: "250px",
                          mt: 3, 
                          mb: 2 }}
                    >
                      Go To Mint
                    </Button> : null
                    }

                  { ticketUrl ? 
                    <>
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          endIcon={<ContentCopyIcon />}
                          onClick = {()=> copy(ticketUrl)}
                          color="secondary"
                          sx={{ 
                            maxWidth: "250px",
                            mt: 2, 
                            mb: 2,
                             }}
                      >
                        Copy Ticket URL
                      </Button>
                    </> : null 
                    }
                
            </Card>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}

/*

Old Code: example of using image

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>

*/