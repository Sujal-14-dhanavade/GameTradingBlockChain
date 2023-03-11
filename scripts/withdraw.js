// withdrawing money from tokens
const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {deployer} = await getNamedAccounts();
    const token = await ethers.getContract("Token", deployer);
    const response = await token.withDraw();
    await response.wait(1);
}


main().catch(err => {
    console.log(err);
})