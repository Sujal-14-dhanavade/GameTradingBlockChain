// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {

    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
    console.log("User A creating custom Store item....");
    console.log("\n");

    const {actor} = await getNamedAccounts();

    console.log("\t\tUser A address : - " + actor + " accessing GameStore contract");

    const Store = await ethers.getContract("GameStore", actor);

    console.log("\t\t\t* User A creating custom item 1 :- " + JSON.stringify({"name": "Pikachu", "type": "Electric", "Level": "5"}));
    
    const responseItem1 = await Store.createCustomItems("wallet1", "Pikachu", "Electric", "5");
    await responseItem1.wait(1);

    console.log("\t\t\t* Custom Item created");
    console.log("------------------------------------------------------------------------");
    console.log("\t\t Verifying Custom item in User A's Wallet");

    const response = await Store.getWallet("wallet1");

    console.log("\t\t\t* Wallet1 Address:-" + response.toString());

    const wallet = await ethers.getContractAt("Wallet", response, actor);

    console.log("\t\t\t\t* Item List :- " + (await wallet.getItems()).toString());

    const customItemAddress = await wallet.getItem("1");

    console.log("\t\t\t\t* Custom Item Address :- " + customItemAddress.toString());

    console.log("\t\t\t* User A fetching custom item info");

    const item1 = await ethers.getContractAt("GameItem", customItemAddress, actor);
    
    console.log("\t\t\t\t* Custom Item's Owners :- " + (await item1.getOwners()).toString());
    console.log("\t\t\t\t* Custom Item's Name :- " + (await item1.getName()).toString());
    console.log("\t\t\t\t* Custom Item's Type :- " + (await item1.getTypeOf()).toString());
    console.log("\t\t\t\t* Custom Item's Level :- " + (await item1.getLevel()).toString());
    console.log("\t\t\t\t* Custom Item's Version :- " + (await item1.getVersion()).toString());
    console.log("\t\t\t\t* Custom Item Not listed in store Yet so no price set");
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");

}


main().catch(err => {
    console.log(err);
})