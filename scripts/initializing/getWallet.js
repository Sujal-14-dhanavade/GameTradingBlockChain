// get 2 Wallet info

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
    console.log("----------------------------------------------------------")
    const Store1 = await ethers.getContract("GameStore", actor2);
    const response1 = await Store1.getWallet("wallet2");
    const wallet1 = await ethers.getContractAt("Wallet", response1, actor2);
    const owner1 = await wallet1.getOwner();
    console.log(owner1.toString());
    const availableTokens1 = await wallet1.availableToken();
    console.log(availableTokens1.toString());
}


main().catch(err => {
    console.log(err);
})