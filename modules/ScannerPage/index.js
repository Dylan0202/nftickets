import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {CONTRACT_ADDRESS} from '../../constants';
import NFTickets from '../../utils/NFTickets.json';
const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), {
    ssr: false
});

export default function ScannerPage() {
    //consts go here
    const [isChecking, setIsChecking] = useState(false);
    const [scannedData, setScannedData] = useState("Not found");
    const [ticketID, setTicketID] = useState();
    const [ticketOwner, setTicketOwner] = useState();
    const [displayInfo, setDisplayInfo] = useState(false);
    const [validTicket, setValidTicket] = useState(false);
    const [ticketContract, setTicketContract] = useState(CONTRACT_ADDRESS);
    const [currentAccount, setCurrentAccount] = useState(null);
    // wallet check - needs to be a scanner's wallet - i wonder if we can whitelist specific addresses that are scanners
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
    // functions here
    const veriTicket = async (qrJson) => {
      console.log(qrJson);
      console.log(typeof(qrJson));
        setIsChecking(true);
        try {
            if (ticketContract){
                console.log(qrJson.owner)
                let ticketId = Number(qrJson.ticketId) - 1
                console.log(ticketId)
                const verifyTxn = await ticketContract.verifyTicket(qrJson.owner, qrJson.ticketId); //change back to qrJson.ticketId
                console.log(verifyTxn);
                setDisplayInfo(true);
                setValidTicket(true);
            }
            setValidTicket(true);
            setDisplayInfo(true);
        } catch (error) {
            console.log(error);
            setValidTicket(false);
        }
        setIsChecking(false);
    }
    const parseDataAndSend = async (qrData) => {
        console.log(typeof(qrData));
        var jsonData = JSON.parse(qrData);
        setTicketID(jsonData.ticketID);
        setTicketOwner(jsonData.owner);
        console.log("parsing");
        veriTicket(jsonData);
    }
    const renderScanner = () => {
        if (!isChecking) {
            return (
                <BarcodeScannerComponent
                    width={400}
                    height={400}
                    onUpdate={(err, result) => {
                        if (result) {
                          setScannedData(result.text);
                          parseDataAndSend(result.text);
                        }
                       else setScannedData("Not Found");
                    }}
                />
            );
        } else return (
            <h3> Checking... </h3>
        ); 
    }
    const renderTicketInfo = () =>{
        if (displayInfo && validTicket){
            return(
                <div className="ticketInfo">
                    <div className="scannedInfo">
                        <ul>
                                <li>Event Name:</li>
                                <li>Event Time:</li>
                        </ul>
                        <img className="ticketImage"
                        src="https://www.tribout.com/wp-content/uploads/2019/07/roll-tickets-admit-one-blue.jpg"
                        />
                    <ul>
                        <li>Ticket Id: {ticketID}</li>
                        <li>Ticket Owner: {ticketOwner}</li>
                    </ul>
                    <h2> YOUR TICKET IS VALID. ENJOY THE SHOW </h2>
                </div>
                </div>
            )
        } else{
            return(
            <h1 className="header">Scan Ticket Please</h1>
            )
        }
    }

    const renderInvalidTicket = () => {
        if (!validTicket && displayInfo) {
            return (
                <div className="ticketInfo">
                    <div className="scannedInfo">
                        <div className="invalidTicket">
                            Your Ticket is not Valid...
                            <img src="data:image/png;base64,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"/>
                        </div>   
                </div>
                </div>
            )
        }
    }
    useEffect(() => {
        checkIfWalletIsConnected();
      }, []);

      useEffect(() => { 
        const {ethereum} = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const ticketContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            NFTickets.abi,
            signer
          );
          setTicketContract(ticketContract);
        } else {
          console.log('Ethereum object not found :(');
        }
      }, []);

    //final render
    return (
        <div className="mainContainer">
            <div className="dataContainer">
                <div className="scannerContainer">
               {renderScanner()}
                </div>
                <div className="description">                    
                {renderTicketInfo()}
                {renderInvalidTicket()}
                </div>
            </div>
        </div>
    )
}