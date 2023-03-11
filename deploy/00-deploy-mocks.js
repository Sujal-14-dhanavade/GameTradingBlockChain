// for creating mocks for local host

const {network} = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts(); 
    const DECIMAL = 8;
    const Initial = 2000_0000_0000;
    const developmentChains = ["hardhat", "localhost", "ganache"];
    if(developmentChains.includes(network.name)) {
        log("Local network detected!");
        await deploy("MockV3Aggregator", {
            from: deployer,
            args: [DECIMAL, Initial],
            log: true
        });
        log("Mocks deployed");
        log("----------------------------------------------------------------")
    }
}

// this is for mentioning whether we want to deploy mocks npx hardhat deploy --tags mocks
module.exports.tags = ["all", "mocks"];