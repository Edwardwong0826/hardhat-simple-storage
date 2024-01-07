require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
//require("@nomiclabs/hardhat-waffle"); - when import will got conflict error with other package
//require("@nomicfoundation/hardhat-verify"); - when import will hit error, use below etherscan 
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("./tasks/block-number");  // this is customer task we defind and export in tasks folder, so that display in available tasks when - npx hardhat
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
module.exports = {
  // defaultNetwork: "hardhat" // this is fake default hardhat network running online
  defaultNetwork: "hardhat",
  networks:{
    sepolia: {
        url: SEPOLIA_RPC_URL, // the testnet rpc url, get from alchemy
        accounts: [PRIVATE_KEY],
        chainId: 11155111, // put the testnet chainId
    },
    // this localhost hardhat network, no need to specify account
    localhost: {
        url: "http://127.0.0.1:8545/",
        chainId : 31337, 
    }
  },
  // this api key is for calling etherscan api to do contract verification 
  // etherscan: {
  //   apiKey: {
  //     sepolia: ETHERSCAN_API_KEY,
  //   }, /
  // }
  solidity: "0.8.19",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter:{
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    // put this coinmarket api key can enable USD conversion in the gas report
    coinmarketcap : COINMARKETCAP_API_KEY,
    // this token to specify which blockchain net we want to test, example MATIC is polygon
    //token: "MATIC",
  },

};
