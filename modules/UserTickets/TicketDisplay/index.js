import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';


export default function TicketDisplay() {

    //will likely need to use the CID to get event ID data. 

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
                    Elton John
                </Typography>
                <Typography component="h4" variant="h5">
                    Crypto.com Arena
                </Typography>
                <Typography component="h5" variant="h5">
                    4/24, 7pm
                </Typography>
                <Button >
                    Click me
                </Button>

            </Card> 
        </Container>
    )
}