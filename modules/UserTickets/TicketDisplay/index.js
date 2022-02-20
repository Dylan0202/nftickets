import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';

export default function TicketDisplay() {

    return(
        <Container component="main" maxWidth="xs">
            <Card
            sx={{
                margin: 4,
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography component="h1" variant="h5">
                Build Shit Here
                </Typography>
            </Card> 
        </Container>
    )
}