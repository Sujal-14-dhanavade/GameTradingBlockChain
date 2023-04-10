// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor2} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", actor2);
    const getCustomItem = await Store.storeCustomItems("0");
    const buyResponse = await Store.buyCustomItems("wallet2", getCustomItem);
    await buyResponse.wait(1);
    console.log("----------------------------------------custom item bought--------------");
    console.log("Item Address:-" + getCustomItem.toString());
    const item1 = await ethers.getContractAt("GameItem", getCustomItem, actor2);
    console.log((await item1.owners("1")).toString());
    console.log("------------------------------------------- first buy successful owner visible in custom item owners ----------------------------");
    const response = await Store.getWallet("wallet2");
    console.log("Wallet Address:-" + response.toString());
    const wallet = await ethers.getContractAt("Wallet", response, actor2);
    console.log((await wallet.getItem("1")).toString());
}


main().catch(err => {
    console.log(err);
})