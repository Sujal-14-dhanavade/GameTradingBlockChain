// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {

    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
    console.log("User A listing custom item in game store....");
    console.log("\n");

    const {actor} = await getNamedAccounts();

    console.log("\t\tUser A address : - " + actor + " accessing GameStore contract");

    const Store = await ethers.getContract("GameStore", actor);

    console.log("\t\t\t* User A listing custom item 1 in store with price 16 Tokens");

    const response = await Store.listingCustomItems("wallet1", "1", "16");
    await response.wait(1);
    
    console.log("\t\t\t* Custom Item listed in store");
    console.log("\t\t\t* User A fetching custom item price");
    const response1 = await Store.getWallet("wallet1");
    const wallet = await ethers.getContractAt("Wallet", response1, actor);
    const customItemAddress = await wallet.getItem("1");

    console.log("\t\t\t\t* Custom Item Address:-" + customItemAddress.toString());
    console.log("\t\t\t\t* listed Price:- " + parseFloat((await Store.listedUserMintedItemsToToken(customItemAddress)).toString()) / 1e8 + " Game Tokens");
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
}


main().catch(err => {
    console.log(err);
})