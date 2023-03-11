// for creating mocks for local host
const networkConfig = require("../hardhat-helper-config");
const {network} = require("hardhat");
const verify = require("../utils/verify");
require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts(); 
    const chainId = network.config.chainId;
    let ethUsdPriceFeed;
    const developmentChains= ["hardhat", "localhost", "ganache"];

    if(developmentChains.includes(network.name)) {
        const ethUsdPriceFeedContract = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeed = ethUsdPriceFeedContract.address;
    } else {
        ethUsdPriceFeed = networkConfig[chainId]["ethUsdPriceFeed"];
    }
    
    const contract = await deploy("Token", {
        from: deployer,
        args: [ethUsdPriceFeed],
        log: true,
        waitConfirmations: chainId === 5? 6 : 1
    })

    if( !developmentChains.includes(network.name) && process.env.API) {
        await verify(contract.address, [ethUsdPriceFeed]);
    }
    log("-----------------------------------------")
}

// this is for mentioning whether we want to deploy mocks npx hardhat deploy --tags mocks
module.exports.tags = ["all", "mocks"];