import { ethers } from 'ethers';
import {useEffect, useState} from 'react'
import {CONTRACT_ADDRESS} from '../../constants'
import NFTickets from '../../utils/NFTickets.json'
import Card from '@mui/material/Card';
import TicketDisplay from './TicketDisplay'
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//Place this in Avatar <LockOutlinedIcon />
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = "_U8Lq4eBGpjj3QQpnmXIPSjt5CJz0UsI";
const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}/getNFTs/`;
// replace with the wallet address you want to query for NFTs
//const ownerAddr = "0xfAE46f94Ee7B2Acb497CEcAFf6Cff17F621c693D";


/*
axios(config)
.then(response => console.log(JSON.stringify(response.data, null, 2)))
.catch(error => console.log(error));
*/


export default function UserTickets() {
  
  const [ticketContract, setTicketContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [ticketData, setTicketData] = useState([{test:"test"},{test:"test1"},{test:"test2"},{test:"test3"}])
  const [userNFTs, setUserNFTs] = useState(null);


  let userNFTkey = 0

  /**Use Later
      const onMintEvent = async (sender, tokenId) => {
    setMinted(true)
    console.log(
      `NFTicket Minted! - sender: ${sender} tokenId: ${tokenId.toNumber()}`
    );

  };
  **/

  // Actions

  const callGetEvents = async () => {
    
    if(currentAccount){

      //console.log(currentAccount)

      //let data = await ticketContract.getMyEvents(currentAccount, {gasLimit: 2000000})

      var config = {
        method: 'get',
        url: `${baseURL}?owner=${currentAccount}&withMetadata=true&contractAddresses[]=${CONTRACT_ADDRESS}`
      };

      let data = await axios(config);

      //console.log(data.data.ownedNfts)

      let userNftArray = [] 

      for(let nft of data.data.ownedNfts){

        console.log(nft.metadata)
        //console.log(nft.id.tokenId)

        if(nft.metadata.attributes.length > 0){

          userNftArray.push({
            eventName: nft.metadata.name,
            eventVendor: nft.metadata.attributes[0].value,
            eventTime: nft.metadata.attributes[2].value,
            eventDate: nft.metadata.attributes[1].value,
            ticketID: parseInt(nft.id.tokenId, 16)
          })

        }

      }

      setUserNFTs(userNftArray)
      
    }
  }


  const checkIfWalletIsConnected = async () => {

    /*
      * First make sure we have access to window.ethereum
      */
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Make sure you have MetaMask!');
        setCurrentAccount(null);
        return false;
      } else {
        console.log('We have the ethereum object', ethereum);

        /*
          * Check if we're authorized to access the user's wallet
          */
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        /*
          * User can have multiple authorized accounts, we grab the first one if its there!
          */
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
          return true
        } else {
          console.log('No authorized account found');
          setCurrentAccount(null);
          return false
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletAction = async () => {

    console.log("attempting to connect wallet")
  

    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  /*
  * This runs our checkWallet function when the page loads.
  */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    callGetEvents();
  }, [currentAccount]);



  /*
  * This runs our checkWallet function when the page loads.
  */

  /* Dont need this just now, wait to connecct to Contract
 useEffect(() => {

    //setTicketUrl("http://localhost:3000/buyaticket?cid=" + cid);
    //alert(`Your NFT is all done -- see it here: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)

  if (ticketContract) {
    //Setup NFT Minted Listener

    ticketContract.on('minted', onMintEvent);
  }

  return () => {
    // When your component unmounts, let's make sure to clean up this listener
    if (ticketContract) {
      ticketContract.off('eventInitialized', onMintEvent);
    }
  }

}, [ticketContract]);
*/


  return(
    <div>
    { currentAccount && userNFTs ?  
        <>
        <Container component="main" maxWidth="xs">
        <Card
            sx={{
            marginTop: 8,
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'primary.main'
            }}>
            <Typography variant="h4" sx={{color: '#C9A35A', fontWeight: "bold"}}>
                Your Tickets
            </Typography>
            </Card>
        </Container>


        {userNFTs.map((data)=> {
            return (
                <TicketDisplay data = {data} key = {userNFTkey++}/>
            )
        })}
        </>
        :
      <Container component="main" maxWidth="xs">
      <Card
          sx={{
          marginTop: 8,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          }}>

          <Typography component="h1">
            Connect Wallet to Buy A Ticket!
          </Typography>
          <Button 
          sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              }}
          variant="contained"
          onClick = {()=>connectWalletAction()}>
          Connect Wallet
          </Button>
      </Card>
    </Container>
    }
    </div>
  )    
}