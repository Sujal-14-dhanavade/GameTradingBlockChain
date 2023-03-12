// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", actor);
    const responseItem1 = await Store.createCustomItems("wallet1", "Pikachu", "Electric", "5");
    await responseItem1.wait(1);
    console.log("1 custom item created -----------------------------------");
    const response = await Store.getWallet("wallet1");
    console.log("Wallet Address:-" + response.toString());
    const wallet = await ethers.getContractAt("Wallet", response, actor);
    const customItemAddress = await wallet.getItem("1");
    console.log("Custom Item Address:-" + customItemAddress.toString());
    console.log("----------------------------------------------------verifying inside item contract");
    const item1 = await ethers.getContractAt("GameItem", customItemAddress, actor);
    console.log((await item1.owners("0")).toString());
    console.log((await item1.getName()).toString());   
    console.log((await item1.getTypeOf()).toString()); 
    console.log((await item1.getLevel()).toString()); 
    console.log((await item1.getVersion()).toString()); 
}


main().catch(err => {
    console.log(err);
})