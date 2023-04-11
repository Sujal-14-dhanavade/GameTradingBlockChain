// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
    console.log("User B buying custom item of User A in game store....");
    console.log("\n");

    const {actor2} = await getNamedAccounts();

    console.log("\t\tUser B address : - " + actor2 + " accessing GameStore contract");

    const Store = await ethers.getContract("GameStore", actor2);

    console.log("\t\t\t* User B fetching custom item address");

    const getCustomItem = await Store.storeCustomItems("0");

    console.log("\t\t\t\t* Custom Item Address:-" + getCustomItem.toString());
    console.log("\t\t\t\t* User B buying Custom Item");

    const buyResponse = await Store.buyCustomItems("wallet2", getCustomItem);
    await buyResponse.wait(1);

    console.log("\t\t\t\t* Custom Item bought by User B");
    console.log("\t\t\t* Checking list of owners of custom item 1");

    const item1 = await ethers.getContractAt("GameItem", getCustomItem, actor2);

    console.log("\t\t\t\t* Owners :- " + (await item1.getOwners()).toString());
    console.log("\t\t\t* Checking list of items in User B Wallet2");

    const response = await Store.getWallet("wallet2");
    const wallet = await ethers.getContractAt("Wallet", response, actor2);
    
    console.log("\t\t\t\t* Items :- " + (await wallet.getItems()).toString());
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
}


main().catch(err => {
    console.log(err);
})