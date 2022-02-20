import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import QRCode from "react-qr-code";
import {CONTRACT_ADDRESS} from '../../constants'
import NFTickets from '../../utils/NFTickets.json'

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {useRouter} from 'next/router'


//import BarcodeScannerComponent from 'react-qr-barcode-scanner';
//const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), {
//    ssr: false
//});

export default function TicketPage() {

    const router = useRouter();

    //consts go here
    const [parsedData, setParsedData] = useState(JSON.parse("{\n\t\"owner\": \"0x3e4a729E0A975d61494f6992aB19271167D8E0AE\",\n\t\"ticketID\": \"1\"\n}"));
    const [displayInfo, setDisplayInfo] = useState(true);
    // wallet check - needs to be a scanner's wallet - i wonder if we can whitelist specific addresses that are scanners

    const [ticketContract, setTicketContract] = useState(null);
    const [currentAccount, setCurrentAccount] = useState(null);
   
    // functions here
    const parseData = async (data) => {
        var jsonData = JSON.parse(data);
        //setParsedData(jsonData);
        setDisplayInfo(true);
        //verifyTicket(jsonData);
    }

    const getTicketData = async () => {
       //var ticketData = contract.getTicket...
       var ticketData;
       parseData(ticketData);
    }

    const connectTicketContract = async () => {

        if(currentAccount){
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            NFTickets.abi,
            signer
          );
    
          setTicketContract(contract)
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
        //parseData();
        checkIfWalletIsConnected();
      }, []);
    
      useEffect(() => {
        connectTicketContract();
      }, [currentAccount]);

      useEffect(() => {

        if(router.query.eventName){
          console.log("router query", router.query)
        }
    
      }, [router.query]);
    

    const renderTicketInfo = () => {
        if (displayInfo){
            return(
                <div className="ticketInfo">
                    <h1> Your NFTicket: </h1>
                    <div className="scannedInfo">
                    <ul>
                                <li>Event Name: DeadMau5's Castle</li>
                                <li>Event Time: Jan 1st 2023</li>
                        </ul>
                    <QRCode className="qrcode" size={300} value={JSON.stringify(parsedData)}/>
                        <img className="ticketImage"
                        src="https://www.tribout.com/wp-content/uploads/2019/07/roll-tickets-admit-one-blue.jpg"
                        />
                    <ul>
                        <li>Ticket ID: {parsedData.ticketID} </li>
                        <li>Ticket Owner: {parsedData.owner}</li>
                    </ul>
                </div>
                </div>
            )
        } else{
            return(
            <h1 className="header">Display Info Inactive</h1>
            )
        }
    }

    //final render
    return (
      <>

                { currentAccount ? 
                        <Container component="main" maxWidth="xs">
                          <Card
                              sx={{
                              marginTop: 8,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              padding: 3,
                              backgroundColor: 'white' 
                              }}
                          >
                          {renderTicketInfo()}

                      </Card>
                </Container>                  : 
                    <Container component="main" maxWidth="xs">
                    <Card
                        sx={{
                        marginTop: 8,
                        padding: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}>
              
                        <Typography component="h1" variant="h5">
                          Connect Wallet to see your tickets
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
                
</>
    )
}