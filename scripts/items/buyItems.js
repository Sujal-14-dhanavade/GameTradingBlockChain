

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", actor);
    const item1Address = await Store.storeOriginalItems("0");
    const buy = await Store.buyItem("wallet1", item1Address);
    await buy.wait(1);
    console.log("------------------------------------------- item bought---------------------------------------");
    console.log("Item Address:-" + item1Address.toString());
    const item1 = await ethers.getContractAt("GameItem", item1Address, actor);
    console.log((await item1.owners("0")).toString());
    console.log("------------------------------------------- first buy successful owner visible in item owners ----------------------------");
    const response = await Store.getWallet("wallet1");
    console.log("Wallet Address:-" + response.toString());
    const wallet = await ethers.getContractAt("Wallet", response, actor);
    console.log((await wallet.getItem("0")).toString());
}


main().catch(err => {
    console.log(err);
})