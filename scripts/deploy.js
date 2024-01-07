// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

// script and task both can do the same things, can interact,deploy with smart contracts and do anything
// just that task run at npx hardhat task\

//const { ethers, run, network } = require("hardhat"); // hardhat-toolbox 2.0.0 / ethers 5 use this
const hre = require("hardhat"); //  hardhat-toolbox 4.0.0 / ethers 6 use this

async function main() {

  // hardhat-toolbox update to 4.0.0 will use ethers 6
  // while hardhat-toolbox 2.0.0 use ethers 5 

  // ethers 6 use - waitForDeployment(), target()
  // ethers 5 use - deployed(), address()

  //const simpleStorageFactory = await hre.ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await hre.ethers.deployContract("SimpleStorage", [], {});

  console.log("Deploying contract...");

  //const simpleStorage = await simpleStorageFactory.deploy();
  //await simpleStorage.deployed();
  await simpleStorage.waitForDeployment();

  //console.log("Deploying contract to : " + simpleStorage.address);
  console.log("Deploying contract to : " + simpleStorage.target);

  const network = await hre.network.config.chainId;

  //console.log(network.config);
  console.log(network);

  if(network === 11155111 && process.env.ETHERSCAN_API_KEY){
    console.log("Waiting for block transactions...")
    await simpleStorage.deploymentTransaction().wait(3);
    //await simpleStorage.deployTransaction.wait(3); // this means wait 6 block 
    verify(simpleStorage.target, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log("Current value is: " + currentValue);
  const transcationResponse = await simpleStorage.store(7);
  await transcationResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log("Updated value is: " + updatedValue);
}

// npx hardhat test will run and execute below function to do contract verifications
//async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
      await hre.run("verify:verify", {
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
