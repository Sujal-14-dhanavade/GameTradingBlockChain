

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor, actor2} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", actor);
    const item1Address = await Store.storeOriginalItems("0");
    const buy = await Store.buyOriginalItem("wallet1", item1Address);
    await buy.wait(1);
    console.log("------------------------------------------- item bought <from actor 1>---------------------------------------");
    console.log("Item Address:-" + item1Address.toString());
    const item1 = await ethers.getContractAt("GameItem", item1Address, actor);
    console.log((await item1.owners("0")).toString());
    console.log("------------------------------------------- first buy successful owner visible in item owners ----------------------------");
    const response = await Store.getWallet("wallet1");
    console.log("Wallet Address:-" + response.toString());
    const wallet = await ethers.getContractAt("Wallet", response, actor);
    console.log((await wallet.getItem("0")).toString());

    const Store2 = await ethers.getContract("GameStore", actor2);
    const item1Address2 = await Store2.storeOriginalItems("1");
    const buy2 = await Store2.buyOriginalItem("wallet2", item1Address2);
    await buy2.wait(1);
    console.log("------------------------------------------- item bought <from actor 2>---------------------------------------");
    console.log("Item Address:-" + item1Address2.toString());
    const item2 = await ethers.getContractAt("GameItem", item1Address2, actor2);
    console.log((await item2.owners("0")).toString());
    console.log("------------------------------------------- first buy successful owner visible in item owners ----------------------------");
    const response2 = await Store2.getWallet("wallet2");
    console.log("Wallet Address:-" + response2.toString());
    const wallet2 = await ethers.getContractAt("Wallet", response2, actor2);
    console.log((await wallet2.getItem("0")).toString());
}


main().catch(err => {
    console.log(err);
})