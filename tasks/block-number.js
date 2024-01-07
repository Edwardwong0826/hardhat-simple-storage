const {task} = require("hardhat/config");

task("block-number", "Prints the current block number").setAction(
    // async function blockTask(taskArgs, hre) {} 
    // below this arrow anonymous function is the same as above normal function
    // hre arguments is the same as require("hardhat"); in deploy.js
    async(taskArgs, hre) =>{
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log("Current block number : " + blockNumber);
    }
)

module.exports = {}

