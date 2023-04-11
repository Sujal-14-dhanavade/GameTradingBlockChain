

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
    console.log("Getting store original Items info from GameStore contract....");
    console.log("\n");

    const {actor} = await getNamedAccounts();

    console.log("\t\tUser A address : - " + actor + " accessing GameStore contract");

    const Store = await ethers.getContract("GameStore", actor);

    console.log("\t\t\t* User A fetching item1 info");

    const item1Address = await Store.storeOriginalItems("0");

    console.log("\t\t\t\t* Item1's address :- " + item1Address.toString());

    const item1 = await ethers.getContractAt("GameItem", item1Address, actor);

    console.log("\t\t\t\t* Name :- " + (await item1.getName()).toString());
    console.log("\t\t\t\t* Type :- " + (await item1.getTypeOf()).toString());
    console.log("\t\t\t\t* Level :- " + (await item1.getLevel()).toString());
    console.log("\t\t\t\t* Version :- " + (await item1.getVersion()).toString());
    console.log("\t\t\t\t* Price :- " + parseFloat((await Store.listedStoreItemsToToken(item1Address)).toString()) / 1e8 + " Game Tokens");

    console.log("\t\t\t* User A fetching item2 info");

    const item2Address = await Store.storeOriginalItems("1");

    console.log("\t\t\t\t* Item2's address :- " + item2Address.toString());

    const item2 = await ethers.getContractAt("GameItem", item2Address, actor);

    console.log("\t\t\t\t* Name :- " + (await item2.getName()).toString());
    console.log("\t\t\t\t* Type :- " + (await item2.getTypeOf()).toString());
    console.log("\t\t\t\t* Level :- " + (await item2.getLevel()).toString());
    console.log("\t\t\t\t* Version :- " + (await item2.getVersion()).toString());
    console.log("\t\t\t\t* Price :- " + parseFloat((await Store.listedStoreItemsToToken(item2Address)).toString()) / 1e8 + " Game Tokens");

    console.log("\t\t\t* User A fetching item3 info");

    const item3Address = await Store.storeOriginalItems("2");

    console.log("\t\t\t\t* Item3's address :- " + item3Address.toString());

    const item3 = await ethers.getContractAt("GameItem", item3Address, actor);

    console.log("\t\t\t\t* Name :- " + (await item3.getName()).toString());
    console.log("\t\t\t\t* Type :- " + (await item3.getTypeOf()).toString());
    console.log("\t\t\t\t* Level :- " + (await item3.getLevel()).toString());
    console.log("\t\t\t\t* Version :- " + (await item3.getVersion()).toString());
    console.log("\t\t\t\t* Price :- " + parseFloat((await Store.listedStoreItemsToToken(item3Address)).toString()) / 1e8 + " Game Tokens");

    console.log("\t\t\t* User A fetching item4 info");

    const item4Address = await Store.storeOriginalItems("3");

    console.log("\t\t\t\t* Item4's address :- " + item4Address.toString());

    const item4 = await ethers.getContractAt("GameItem", item4Address, actor);

    console.log("\t\t\t\t* Name :- " + (await item4.getName()).toString());
    console.log("\t\t\t\t* Type :- " + (await item4.getTypeOf()).toString());
    console.log("\t\t\t\t* Level :- " + (await item4.getLevel()).toString());
    console.log("\t\t\t\t* Version :- " + (await item4.getVersion()).toString());
    console.log("\t\t\t\t* Price :- " + parseFloat((await Store.listedStoreItemsToToken(item4Address)).toString()) / 1e8 + " Game Tokens");
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
}


main().catch(err => {
    console.log(err);
})