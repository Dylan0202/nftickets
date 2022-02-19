import * as React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//Place this in Avatar <LockOutlinedIcon />
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import axios from 'axios'
import Image from 'next/image'
import {useEffect} from 'react'
import ticketPic from '../../../public/ticket.jpg'

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

const readJsonFromPinata = async (jsonBody) => {

  //const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  const getUrl = 'https://gateway.pinata.cloud/ipfs/QmTG7EAauMkLdZL8R7vQv2rHPMCwdTtVcWcGopdMCDtZvw'

  try{

    let response = await axios.get(getUrl)

      console.log(response)

      return response

    } catch (error) {
      console.log(error)
    }
};

export default function MintTicket() {

    useEffect(async () => {
      await readJsonFromPinata();
    }, []);


    return (
        <Container component="main" maxWidth="xs">
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
                Drip Splash!
            </Card>
            <Grid container spacing={2}>
              <Grid item>
                <Image         
                  src={ticketPic}
                  alt="NFTickets"
                />
              </Grid>
            </Grid>
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