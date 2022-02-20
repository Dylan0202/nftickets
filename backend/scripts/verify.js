require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/NFTickets.sol/NFTickets.json")
//console.log(JSON.stringify(contract.abi))

//Create an instance of our contract that we want to interact with
const contractAddress = CONTRACT_ADDRESS
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

//Function to mint an NFT
async function verifyTicket(owner, ticketID){

  // Get my account nonce (used to keep track of the # of txns I've sent)
  //   --- Prevents replay attacks
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

//Create the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 20000000,
    'data': nftContract.methods.verifyTicket(owner, ticketID).encodeABI()
  };


//Sign the transaction using private_key var
const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
signPromise
  .then((signedTx) => {
    web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      function (err, hash) {
        if (!err) {
          console.log(
            "The hash of your transaction is: ",
            hash,
            "\nCheck Alchemy's Mempool to view the status of your transaction!"
          )
        } else {
          console.log(
            "Something went wrong when submitting your transaction:",
            err
          )
        }
      }
    )
  })
  .catch((err) => {
    console.log(" Promise failed:", err)
  })
}
 
console.log(verifyTicket(PUBLIC_KEY, 2))
