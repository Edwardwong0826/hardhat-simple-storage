// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

// hardhat does know the contracts folder and does know it is already compiled
// run in below allow us to run any hardhat task
// available task can list by npx hardhat
const { ethers, run, network } = require("hardhat"); 

async function main() {

  // hardhat is grab from artifacts/contracts
  const simpleStorageFactory = await hre.ethers.getContractFactory("SimpleStorage");
  
  console.log("Deploying contract...");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();

  // if we deploy using hardhat local network, it will automatically come with an RPC URL and private key
  // else just deploy on testnet, npx hardhat run scripts/deploy.js --network sepolia
  console.log("Deploying contract to : " + simpleStorage.address);

  const network = await hre.network.config.chainId;

  console.log(network.config);
  //console.log(network);

  // after deploy, we can verify the smart contracts that we created on blockchain, so that everybody can check the code
  // right now we are using ether scan, so we can use ether scan api to do contract verification
  // we only need to verify on testnet, no need verify on hardhat local network or others local eth network
  if(network === 11155111 && process.env.ETHERSCAN_API_KEY){
    console.log("Waiting for block transactions...")
    await simpleStorage.deployTransaction.wait(3); // this means wait 6 block 
    verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log("Current value is: " + currentValue);
  const transcationResponse = await simpleStorage.store(7);
  await transcationResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log("Updated value is: " + updatedValue);
}

//async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
      // below run first parameter - task:arguments
      // arguments can check by npx hardhat verify -- help
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
      })
    } catch (e) {
      if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already Verified!")
      } else {
        console.log(e)
      }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
