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
        "7274073bf949cf5e050c97cfab92da5f16d6ab55ad16d314ec0a6c95179e1247",
        "9c3ea337a1bdab37326e9278d9bfba310060be067ecb64dbf9154e47cfe88390",
        "919986ad79152141e9c3793634bb611d18b5e72199752ba7dbe9582f770f5098",

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
