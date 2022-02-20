import Ticket from '../modules/TicketPage'
import Head from 'next/head'

function TicketPage() {
  return ( 
    <>
      <Head>
      <title>NFTickets</title>
      <meta name="description" content="Your ticket as an NFT." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Ticket /> 
  </>
  )
}

export default TicketPage
