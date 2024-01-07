// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

// script and task both can do the same things, can interact,deploy with smart contracts and do anything
// just that task run at npx hardhat task
const { ethers, run, network } = require("hardhat");

async function main() {

  const simpleStorageFactory = await hre.ethers.getContractFactory("SimpleStorage");
  
  console.log("Deploying contract...");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();

  console.log("Deploying contract to : " + simpleStorage.address);

  const network = await hre.network.config.chainId;

  //console.log(network.config);
  console.log(network);

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
