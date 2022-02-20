//import UserTickets from '../modules/BuyATicket'
import Head from 'next/head'

function BuyATicket() {
  return ( 
    <>
      <Head>
      <title>Your Tickets</title>
      <meta name="description" content="Get your ticket here." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <BuyTicket /> 
  </>
  )
}

export default BuyATicket