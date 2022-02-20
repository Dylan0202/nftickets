async function main() {

    console.log("Beginning deploy.js")
  
    // ContractFactory = abstraction for deploying new s.c.
    const NFTickets_SC = await ethers.getContractFactory("NFTickets")
  
    console.log("1")
  
    // Start deployment, returning a promise that resolves to a contract object
    // This is the object that has a method for each of our s.c. functions
    const NFTickets_Obj = await NFTickets_SC.deploy()
  
    console.log("2")
  
    await NFTickets_Obj.deployed()
  
    console.log("Contract deployed to address:", NFTickets_Obj.address)
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  