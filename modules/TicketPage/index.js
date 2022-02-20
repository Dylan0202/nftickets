import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import QRCode from "react-qr-code";
//import BarcodeScannerComponent from 'react-qr-barcode-scanner';
//const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), {
//    ssr: false
//});

export default function TicketPage() {
    //consts go here
    const [parsedData, setParsedData] = useState(JSON.parse("{\n\t\"owner\": \"0x343rfd323j42h34rdrdfsdfsdf\",\n\t\"ticket\": \"1231223\"\n}"));
    const [displayInfo, setDispalyInfo] = useState(true);
    // wallet check - needs to be a scanner's wallet - i wonder if we can whitelist specific addresses that are scanners
   
    // functions here
    const parseData = async (data) => {
        var jsonData = JSON.parse(data);
        //setParsedData(jsonData);
        setDispalyInfo(true);
        //verifyTicket(jsonData);
    }

    const getTicketData = async () => {
       //var ticketData = contract.getTicket...
       var ticketData;
       parseData(ticketData);
    }

    useEffect(() => {
        //parseData();
      }, []);

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
                    <QRCode className="qrcode" size={300} value={parsedData.toString()}/>
                        <img className="ticketImage"
                        src="https://www.tribout.com/wp-content/uploads/2019/07/roll-tickets-admit-one-blue.jpg"
                        />
                    <ul>
                        <li>Ticket ID: {parsedData.ticket} </li>
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
        <div className="mainContainer">
            <div className="dataContainer">
                <div className="description">
                {renderTicketInfo()}
                </div>
            </div>
        </div>
    )
}