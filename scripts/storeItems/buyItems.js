

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
    console.log("Getting store original Items info from GameStore contract....");
    console.log("\n");

    const {actor, actor2} = await getNamedAccounts();

    console.log("\t\tUser A address : - " + actor + " accessing GameStore contract");

    const Store = await ethers.getContract("GameStore", actor);

    console.log("\t\t\t* User A fetching item1 info");

    const item1Address = await Store.storeOriginalItems("0");

    console.log("\t\t\t\t* Item1's address :- " + item1Address.toString());
    console.log("\t\t\t\t* User A buying item1");

    const buy = await Store.buyOriginalItem("wallet1", item1Address);
    await buy.wait(1);

    console.log("\t\t\t\t* User A bought item1");
    console.log("\t\t\t* Checking list of owners in item1");

    const item1 = await ethers.getContractAt("GameItem", item1Address, actor);

    console.log("\t\t\t\t* " + (await item1.getOwners()).toString());
    console.log("\t\t\t* Checking list of items in User A's Wallet");

    const response = await Store.getWallet("wallet1");

    console.log("\t\t\t\t* User A's wallet address for wallet1 is :- " + response.toString());

    const wallet = await ethers.getContractAt("Wallet", response, actor);

    console.log("\t\t\t\t* Item List :- " + (await wallet.getItems()).toString());
    console.log("------------------------------------------------------------------------");

    console.log("\t\tUser B address : - " + actor2 + " accessing GameStore contract");

    const Store2 = await ethers.getContract("GameStore", actor2);

    console.log("\t\t\t* User B fetching item2 info");

    const item1Address2 = await Store2.storeOriginalItems("1");

    console.log("\t\t\t\t* Item2's address :- " + item1Address2.toString());
    console.log("\t\t\t\t* User B buying item2");

    const buy2 = await Store2.buyOriginalItem("wallet2", item1Address2);
    await buy2.wait(1);

    console.log("\t\t\t\t* User B bought item2");
    console.log("\t\t\t* Checking list of owners in item2");
    const item2 = await ethers.getContractAt("GameItem", item1Address2, actor2);
    
    console.log("\t\t\t\t* " + (await item2.getOwners()).toString());
    console.log("\t\t\t* Checking list of items in User B's Wallet");

    const response2 = await Store2.getWallet("wallet2");
    
    console.log("\t\t\t\t* User B's wallet address for wallet2 is :- " + response2.toString());

    const wallet2 = await ethers.getContractAt("Wallet", response2, actor2);
    
    console.log("\t\t\t\t* Item List :- " + (await wallet2.getItems()).toString());

    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
}


main().catch(err => {
    console.log(err);
})