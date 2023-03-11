// for creating mocks for local host
const {network} = require("hardhat");
const verify = require("../utils/verify");
require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts(); 
    const chainId = network.config.chainId;
    const developmentChains= ["hardhat", "localhost", "ganache"];
    
    const contract = await deploy("GameStore", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: chainId === 5? 6 : 1
    })

    if( !developmentChains.includes(network.name) && process.env.API) {
        await verify(contract.address, [ethUsdPriceFeed]);
    }
    log("-----------------------------------------")
}

// this is for mentioning whether we want to deploy mocks npx hardhat deploy --tags mocks
module.exports.tags = ["all", "Store"];