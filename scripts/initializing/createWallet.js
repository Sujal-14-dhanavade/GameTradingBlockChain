// creating 2 wallet

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
    console.log("Creating Wallets for User A and User B");
    console.log("\n");

    const {actor, actor2} = await getNamedAccounts();

    console.log("\t\tUser A address : - " + actor + " accessing GameStore contract");

    const Store = await ethers.getContract("GameStore", actor);

    console.log("\t\t\t* User A creating wallet with name wallet1");

    const response = await Store.createWallet("wallet1");
    await response.wait(1);

    console.log("\t\t\t* User A created wallet with name wallet1");

    const res = await Store.getWallet("wallet1");

    console.log("\t\t\t* User A's wallet address for wallet1 is :- " + res.toString());
    console.log("------------------------------------------------------------------------");
    console.log("\t\tUser B address : - " + actor2 + " accessing GameStore contract");

    const Store1 = await ethers.getContract("GameStore", actor2);

    console.log("\t\t\t* User B creating wallet with name wallet2");

    const response1 = await Store1.createWallet("wallet2");
    await response1.wait(1);

    console.log("\t\t\t* User B created wallet with name wallet2");

    const res1 = await Store1.getWallet("wallet2");

    console.log("\t\t\t* User B's wallet address for wallet2 is :- " + res1.toString());
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
}


main().catch(err => {
    console.log(err);
})