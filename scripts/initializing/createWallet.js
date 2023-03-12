// creating 2 wallet

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor, actor2} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", actor);
    const response = await Store.createWallet("wallet1");
    await response.wait(1);
    const res = await Store.getWallet("wallet1");
    console.log("Wallet1:- " + res.toString());
    const Store1 = await ethers.getContract("GameStore", actor2);
    const response1 = await Store1.createWallet("wallet2");
    await response1.wait(1);
    const res1 = await Store1.getWallet("wallet2");
    console.log("Wallet2:- " + res1.toString());
}


main().catch(err => {
    console.log(err);
})