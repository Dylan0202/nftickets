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
import CardMedia from '@mui/material/CardMedia';
import NextLink from 'next/link'

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

const readJsonFromPinata = async (cid) => {

  //const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  const getUrl = 'https://gateway.pinata.cloud/ipfs/' + cid

  try{

    let response = await axios.get(getUrl)

    console.log(response)

      return response.data.attributes


    } catch (error) {
      console.log(error)
    }
};

export default function MintTicket({mintDetails, ticketContract, minted}) {

    const [response, setResponse] = React.useState(null)
    const [details, setDetails] = React.useState(mintDetails)
    const [loading, setLoading] = React.useState(null)

    const callMintTicket = async () => {
      setLoading(true)
      await ticketContract.mintTicket(mintDetails.eventId)
      // OLD CONTRACT CODE:  await ticketContract.mintNFT(mintDetails.eventId, mintDetails.cid)

      //console.log("ticket Minted")
    }

    const returnButton = () =>{
      if(minted){
        return(
          <Grid container display = "flex" flexDirection = "column" >
            <Button variant = "contained" color = "primary" sx = {{m:1}}>
              Ticket Minted!
            </Button>
            <NextLink href="/userTickets" >
              <Button variant = "contained" color = "secondary" sx = {{m:1}}>
                See Your Tickets
              </Button>
            </NextLink>
           </Grid>
        )

      } else if(loading){
        return(
          <Button variant = "contained" color = "primary" disabled>
            Ticket Minting...
          </Button>
          )
      }
      return(
        <Button variant = "contained" color = "secondary" onClick = {() => {callMintTicket()}}>
        Mint a Ticket
      </Button>
      )
    }

    useEffect( () => {

      async function settingResponse() {
        //console.log(details)
        setResponse(await readJsonFromPinata(details.cid))
      }

      settingResponse()

      //console.log(response)
    }, [details]);



    return (
        <Container component="main" maxWidth="xs">
            <Card
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                backgroundColor: 'white' 
                }}
            >
              
              <Typography variant = "h4">
                Mint your NFTicket
              </Typography>
              <CardMedia  title="NFTickets">
              <Image
                src={ticketPic}
                objectFit="contain" // or objectFit="cover"
                alt = "nftticket"
              />
            </CardMedia>
            {response ? 
              <>
                <Grid item 
                  sx = {{mt:1}}
                >
                  <Typography variant = "h4">
                    {response[3].value}
                  </Typography>
                </Grid>
                <Grid item 
                  sx = {{m:1}}
                >
                  <Typography variant = "subtitle1">
                    An NFTicket to your favorite event!
                  </Typography>
                </Grid>
                <Grid item 
                  sx = {{m:1}}
                >
                  <Typography variant = "h5">
                    {response[0].value}
                  </Typography>
                </Grid>
                <Grid item 
                  sx = {{m:1}}
                >
                  <Typography variant = "h5">
                    {response[1].value}
                  </Typography>
                </Grid>
                <Grid item 
                  sx = {{m:1}}
                >
                  {returnButton()}
                </Grid>
              </>
              : null }
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