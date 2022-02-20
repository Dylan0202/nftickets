import EventList from '../modules/EventList'
import Head from 'next/head'

function Event() {
  return ( 
    <>
      <Head>
      <title>NFTickets</title>
      <meta name="description" content="Your ticket as an NFT." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <EventList /> 
  </>
  )
}

export default Event
