require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {version: "0.8.17"},
      {version: "0.6.6"}
    ]
  },
  networks: {
    "ganache": {
      url: "http://127.0.0.1:7545",
      accounts: [
        "c63433915da7d7f39a2ff3994c826758284aba106d5a268f91c8c884a738c1db",
        "dd11eeb2d4e04fb18e0b84ddb9a47924d5791bfedb28e328df08ad3aa7ac9876",
        "38d99ce06668c7e32867799d25fef7c598c95154ac370538115fe1e31eb08b89",

      ]
    },
    "goerli": {
      url: process.env.RPC_URL_2,
      accounts: [
        process.env.PRIVATE_KEY_2
      ],
      chainId: 5
    }
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
    },
    actor : {
      default: 1,
    },
    actor2 : {
      default: 2,
    }
  },
  etherscan: {
    apiKey: process.env.API
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-reporter.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: process.env.COIN_API
  }
};
