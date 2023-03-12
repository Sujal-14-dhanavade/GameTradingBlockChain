// get Wallet info

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor, actor2} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", actor);
    const response = await Store.getWallet("wallet1");
    const wallet = await ethers.getContractAt("Wallet", response, actor);
    const owner = await wallet.getOwner();
    console.log(owner.toString());
    const availableTokens = await wallet.availableToken();
    console.log(availableTokens.toString());
}


main().catch(err => {
    console.log(err);
})