import CreateEvent from './CreateEvent'
import { ethers } from 'ethers';
import {useEffect, useState} from 'react'
import {CONTRACT_ADDRESS} from '../../constants'
import NFTickets from '../../utils/NFTickets.json'
import Card from '@mui/material/Card';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//Place this in Avatar <LockOutlinedIcon />
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import axios from 'axios'
import {useRouter} from 'next/router'


function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var eventTime = hours + ':' + minutes + ' ' + ampm;
  
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  const eventDate = month  + '/'+ day + '/' + year ;
  
  return {eventDate, eventTime};
}

const postJsonToPinata = async (jsonBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  try{
    let response = await axios.post(url, jsonBody, {
          headers: {
              pinata_api_key: '2944d6e6de50b55e0f15',
              pinata_secret_api_key: 'fa6bcee17fbe85fb46958bd1dd1f3e2838eb4f0392ae2b35ebfd293720644fc6'
          }
      })

      return response

    } catch (error) {
      console.log(error)
    }
};


export default function HomePage() {
  
  const [ticketContract, setTicketContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [ticketUrl, setTicketUrl] = useState(false)
  const [confirmedEvent, setConfirmedEvent] = useState(false)
  const [cid, setCid] = useState(null)

  const router = useRouter();

  /***Known-Issues / Enhancements
  1. if the wallet is disconnected, the app doesnt automatically "log out"
  **/

 const onInitEvent = async (sender, eventId) => {
    //console.log(cid)
    console.log(
      `EventInitialized - sender: ${sender} tokenId: ${eventId.toNumber()}`
    );
    setLoadingEvent(false)
    setConfirmedEvent(eventId.toNumber())

  };

  // Actions
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


  const createEventInContract = async (eventObj) => {

    let connected = await checkIfWalletIsConnected()

    if(connected){

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        NFTickets.abi,
        signer
      );

      setTicketContract(contract)

      setLoadingEvent(true)

      let {eventDate, eventTime} = formatTime(eventObj.timeValue)


      let pinataObj = {
        attributes: [
          {
            trait_type: "Event Date",
            value: eventDate
          },
          {
            trait_type: "Event Time",
            value: eventTime
          },
          {
            trait_type: "Vendor Name",
            value: eventObj.vendorName
          },
          {
            trait_type: "Event Name",
            value: eventObj.eventName
          },
          {
            trait_type: "Max Tickets",
            value: Number(eventObj.ticketNumber)
          },
        ],
        description: "New NFTicket Event",
        image: null        
      }

      console.log("contract is connected!", pinataObj )


      //connect to the pinata ipfs server to send NFT Data
      let response = await postJsonToPinata(pinataObj)

      setCid(response.data.IpfsHash)
      console.log(response.data.IpfsHash)

      //send eventID, maxCapacity and CID to the solidity contract

      await contract.initEvent(eventObj.eventName, Number(eventObj.ticketNumber))
      //move this to a button press after the contract loads
      /*
      router.push({
        pathname: '/buyaticket',
        query: {cid},
      }) */
      
      //wait for data from the emitter

      /*
      router.push({
        pathname: `/cryptoDFS/enter-contest`,
        query: {
          date: dfsTeam[9].date,
          pg_one:  dfsTeam[1].name,
          pg_two:  dfsTeam[2].name,
          sg_one:  dfsTeam[3].name,
          sg_two:  dfsTeam[4].name,
          sf_one:  dfsTeam[5].name,
          sf_two:  dfsTeam[6].name,
          pf_one:  dfsTeam[7].name,
          pf_two:  dfsTeam[8].name,
          c:  dfsTeam[9].name,
        },
      })
      */
      
      /*
      try {
        if (gameContract) {
          console.log('Minting character in progress...');
            await gameContract.mintDFSTeamNFT(
            dfsTeam[9].date,
            Number(dfsTeam[0].id),
            Number(dfsTeam[1].id),
            Number(dfsTeam[2].id),
            Number(dfsTeam[3].id),
            Number(dfsTeam[4].id),
            Number(dfsTeam[5].id),
            Number(dfsTeam[6].id),
            Number(dfsTeam[7].id),
            Number(dfsTeam[8].id),
            {value: ethers.utils.parseEther("1")}
          );

          //router.push(`/cryptoDFS/enter-contest`) //could also transfer NFT Data

          router.push({
            pathname: `/cryptoDFS/enter-contest`,
            query: {
              date: dfsTeam[9].date,
              pg_one:  dfsTeam[1].name,
              pg_two:  dfsTeam[2].name,
              sg_one:  dfsTeam[3].name,
              sg_two:  dfsTeam[4].name,
              sf_one:  dfsTeam[5].name,
              sf_two:  dfsTeam[6].name,
              pf_one:  dfsTeam[7].name,
              pf_two:  dfsTeam[8].name,
              c:  dfsTeam[9].name,
            },
          })


          //await mintTxn.wait();
          //console.log('mintTxn:', mintTxn);
        }
      } catch (error) {
        console.warn('MintCharacterAction Error:', error);
      }
      */

    } else {
      alert("confirm Metamask is connected")
    }
  };

  /*
  * This runs our checkWallet function when the page loads.
  */
  useEffect(() => {
    if(confirmedEvent){
      console.log(cid)
      console.log(confirmedEvent)
      setTicketUrl("http://localhost:3000/buyaticket?cid="+cid+"&eventId="+confirmedEvent)
    }
  }, [confirmedEvent]);

  /*
  * This runs our checkWallet function when the page loads.
  */
 useEffect(() => {
  checkIfWalletIsConnected();
}, []);

  /*
  * This runs our checkWallet function when the page loads.
  */
  useEffect(() => {

      //setTicketUrl("http://localhost:3000/buyaticket?cid=" + cid);
      //alert(`Your NFT is all done -- see it here: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
  
    if (ticketContract) {
      //Setup NFT Minted Listener
  
      ticketContract.on('eventInitialized', onInitEvent);
    }
  
    return () => {
      // When your component unmounts, let's make sure to clean up this listener
      if (ticketContract) {
        ticketContract.off('eventInitialized', onInitEvent);
      }
    }
    
  }, [ticketContract]);


  return(
    <div>
    { currentAccount ? 
      <>
        <CreateEvent confirmedEvent = {confirmedEvent} loadingEvent = {loadingEvent} ticketUrl = {ticketUrl} makeEvent = {(obj) =>{createEventInContract(obj)}}/>
      </> :
      <Container component="main" maxWidth="xs">
      <Card
          sx={{
          marginTop: 8,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#F2EFEA'
          }}>

          <Typography component="h1" variant="h5">
          Connect Wallet to Create Event
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

/*


    //Add a callback method that will fire when this event is received

    const onCharacterMint = async (sender, tokenId) => {
    console.log(
      `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()}`
    );

    //alert(`Your NFT is all done -- see it here: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
  };

  if (gameContract) {
    //Setup NFT Minted Listener

    gameContract.on('dfsTeamNFTMinted', onCharacterMint);
  }

  return () => {
    // When your component unmounts, let's make sure to clean up this listener
    if (gameContract) {
      gameContract.off('dfsTeamNFTMinted', onCharacterMint);
    }
  }

*/