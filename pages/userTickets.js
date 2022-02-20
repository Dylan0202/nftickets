import UserTickets from '../modules/UserTickets'
import Head from 'next/head'

function DisplayAllTickets() {
  return ( 
    <>
      <Head>
      <title>Your Tickets</title>
      <meta name="description" content="Get your ticket here." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <UserTickets /> 
  </>
  )
}

export default DisplayAllTickets