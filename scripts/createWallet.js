// creating wallet

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", actor);
    const response = await Store.createWallet("wallet1");
    await response.wait(1);
    const res = await Store.getWallet("wallet1");
    console.log(res);
}


main().catch(err => {
    console.log(err);
})