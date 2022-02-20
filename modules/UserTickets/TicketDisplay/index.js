import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import {useRouter} from 'next/router'



export default function TicketDisplay({data}) {

    const router = useRouter();


    //will likely need to use the CID to get event ID data. 

    const goToTicket = () => {

      router.push({
        pathname: '/ticket',
        query: { 
          eventName: data.eventName,
          eventTime:  data.eventTime,
          eventDate: data.eventDate,
          ticketId: data.ticketID
        },
      }) 

    }

    return(
        <Container component="main" maxWidth="xs">
            <Card
            sx={{
                margin: 2,
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography component="h1" variant="h5">
                    {data.eventName}
                </Typography>
                <Typography component="h4" variant="h5">
                    {data.eventTime}
                </Typography>
                <Typography component="h5" variant="h5">
                    {data.eventDate}
                </Typography>
                <Button onClick= {()=>{goToTicket()}}>
                   See Ticket
                </Button>

            </Card> 
        </Container>
    )
}