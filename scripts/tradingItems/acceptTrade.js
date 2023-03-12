// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor2, actor} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", actor2);
    const Store2 = await ethers.getContract("GameStore", actor);
    const trade = await Store.listedUserTradeItemsToItems("0");
    const response = await Store.tradeItem("wallet2", "0");
    await response.wait(1);
    console.log("------------------Wallet of trade initiator------------------");
    const response1 = await Store2.getWallet("wallet1");
    console.log("Wallet Address:-" + response1.toString());
    const wallet = await ethers.getContractAt("Wallet", response1, actor);
    console.log("Owned Item = " + (await wallet.getItem("0")).toString());
    console.log("------------------Wallet of trade Acceptor------------------");
    const response2 = await Store.getWallet("wallet2");
    console.log("Wallet Address:-" + response2.toString());
    const wallet2 = await ethers.getContractAt("Wallet", response2, actor2);
    console.log("Owned Item  = " + (await wallet2.getItem("0")).toString());
    console.log("------------------Item listed------------------");
    const item1 = await ethers.getContractAt("GameItem", trade.item, actor);
    console.log((await item1.owners("0")).toString());
    console.log("------------------Item traded------------------");
    const item2 = await ethers.getContractAt("GameItem", trade.itemNeeded, actor);
    console.log((await item2.owners("0")).toString());
}


main().catch(err => {
    console.log(err);
})