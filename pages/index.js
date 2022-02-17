import HomePage from '../modules/HomePage'
import Head from 'next/head'

function Home() {
  return ( 
    <>
      <Head>
      <title>NFTickets</title>
      <meta name="description" content="Your ticket as an NFT." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HomePage /> 
  </>
  )
}

export default Home
