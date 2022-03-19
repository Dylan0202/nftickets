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
                <Typography variant="h6" sx={{color: '#C9A35A'}}>
                    {data.eventVendor}
                </Typography>
                <Typography variant="h5" sx={{color: 'primary.main', fontWeight: "bold"}}>
                    {data.eventName}
                </Typography>
                <Typography variant="body1" >
                    {data.eventDate} - {data.eventTime}
                </Typography>
                <Button sx={{color: 'secondary.main'}} onClick= {()=>{goToTicket()}}>
                   See Ticket
                </Button>

            </Card> 
        </Container>
    )
}