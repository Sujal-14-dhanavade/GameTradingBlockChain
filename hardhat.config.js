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
        "c3227f277e528c734514ba2951d2ebe78f3915ac006c105de450ece7fd571b10",
        "82d408c8b99a79cd67897f1ba49076e85a4d557e088b66a252c593eec29bf598",
        "ef59f4d9714710c9c3168e2a2d5854c572f580d411ef0d5ab04cce500bc2165f",

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
