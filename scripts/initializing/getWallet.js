// get 2 Wallet info

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
    console.log("Getting Wallet info for User A and User B....");
    console.log("\n");

    const {actor, actor2} = await getNamedAccounts();

    console.log("\t\tUser A address : - " + actor + " accessing GameStore contract");

    const Store = await ethers.getContract("GameStore", actor);

    console.log("\t\t\t* User A getting wallet info for wallet1");

    const response = await Store.getWallet("wallet1");

    console.log("\t\t\t* Wallet1's address :- " + response.toString());

    const wallet = await ethers.getContractAt("Wallet", response, actor);
    const owner = await wallet.getOwner();

    console.log("\t\t\t* Wallet1's owner as per wallet contract: " + owner.toString());

    const availableTokens = await wallet.availableToken();

    console.log("\t\t\t* Token Remaining in Wallet1 is: " + parseFloat(availableTokens.toString()) / 1e8 + " Game Tokens");
    console.log("----------------------------------------------------------");
    console.log("\t\tUser B address : - " + actor2 + " accessing GameStore contract");

    const Store1 = await ethers.getContract("GameStore", actor2);

    console.log("\t\t\t* User B getting wallet info for wallet2");

    const response1 = await Store1.getWallet("wallet2");

    console.log("\t\t\t* Wallet2's address :- " + response1.toString());

    const wallet1 = await ethers.getContractAt("Wallet", response1, actor2);
    const owner1 = await wallet1.getOwner();

    console.log("\t\t\t* Wallet2's owner as per wallet contract: " + owner1.toString());

    const availableTokens1 = await wallet1.availableToken();

    console.log("\t\t\t* Token Remaining in Wallet2 is: " + parseFloat(availableTokens1.toString()) / 1e8 + " Game Tokens");
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
}


main().catch(err => {
    console.log(err);
})