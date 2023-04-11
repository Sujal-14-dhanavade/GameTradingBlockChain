// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {

    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
    console.log("User A listing item for trade in game store....");
    console.log("\n");

    const {actor} = await getNamedAccounts();

    console.log("\t\tUser A address : - " + actor + " accessing GameStore contract");

    const Store = await ethers.getContract("GameStore", actor);

    console.log("\t\t\t* User A wants below item for trade in store");
    
    const getTradableItem = await Store.storeOriginalItems("1");

    console.log("\t\t\t\t* Item Address : - " + getTradableItem.toString());

    const TradableItem = await ethers.getContractAt("GameItem", getTradableItem, actor);

    console.log("\t\t\t\t* Item Name : - " + (await TradableItem.getName()).toString());
    console.log("\t\t\t\t* Item Type : - " + (await TradableItem.getTypeOf()).toString());
    console.log("\t\t\t\t* Item Level : - " + (await TradableItem.getLevel()).toString());
    console.log("\t\t\t\t* Item Version : - " + (await TradableItem.getVersion()).toString());

    console.log("\t\t\t* User A trades below owned item in store");

    const getOwnedItem = await Store.storeOriginalItems("0");

    console.log("\t\t\t\t* Item Address : - " + getOwnedItem.toString());

    const OwnedItem = await ethers.getContractAt("GameItem", getOwnedItem, actor);

    console.log("\t\t\t\t* Item Name : - " + (await OwnedItem.getName()).toString());
    console.log("\t\t\t\t* Item Type : - " + (await OwnedItem.getTypeOf()).toString());
    console.log("\t\t\t\t* Item Level : - " + (await OwnedItem.getLevel()).toString());
    console.log("\t\t\t\t* Item Version : - " + (await OwnedItem.getVersion()).toString());
    console.log("\t\t\t\t* Listing Owned for trade in store");

    const response = await Store.listingTradeItems("wallet1", "0", getTradableItem);
    await response.wait(1);
    
    console.log("\t\t\t\t* Listed Owned for trade in store");
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
}


main().catch(err => {
    console.log(err);
})