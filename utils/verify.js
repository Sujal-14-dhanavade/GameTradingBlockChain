const {run} = require("hardhat");

const verify = async (contractAddress, args) => {
    // after configuring etherscan we got verify command for hardhat
    // running it using command line
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args
        }); 
    } catch (error) {
        console.log(error);
    }
    
};


module.exports = verify;