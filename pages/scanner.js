import Scanner from '../modules/ScannerPage'
import Head from 'next/head'

function ScannerPage() {
  return ( 
    <>
      <Head>
      <title>NFTickets</title>
      <meta name="description" content="Your ticket as an NFT." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Scanner /> 
  </>
  )
}

export default ScannerPage
