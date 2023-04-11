// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {

    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
    console.log("User B Accepting Trade Conditions of User A....");
    console.log("\n");

    const {actor2, actor} = await getNamedAccounts();

    console.log("\t\tUser B address : - " + actor2 + " accessing GameStore contract");

    const Store = await ethers.getContract("GameStore", actor2);
    const Store2 = await ethers.getContract("GameStore", actor);

    console.log("\t\t\t* User B fetching trade details from store");

    const trade = await Store.listedUserTradeItemsToItems("0");

    console.log("\t\t\t\t* Item Required Address : - " + trade.itemNeeded.toString());
    console.log("\t\t\t\t* Item Given in Exchange Address : - " + trade.item.toString());
    console.log("\t\t\t\t* Trade initiator address : - " + trade.trader.toString());
    console.log("\t\t\t* initiating trading between User B and User A");

    const response = await Store.tradeItem("wallet2", "0");
    await response.wait(1);

    console.log("\t\t\t* Trade Completed successfully");
    console.log("\t\t\t* Fetching Wallet of User A");

    const response1 = await Store2.getWallet("wallet1");

    console.log("\t\t\t\t* Wallet Address:- " + response1.toString());

    const wallet = await ethers.getContractAt("Wallet", response1, actor);

    console.log("\t\t\t\t* Items List :- " + (await wallet.getItems()).toString());

    console.log("\t\t\t* Fetching Wallet of User B");

    const response2 = await Store.getWallet("wallet2");

    console.log("\t\t\t\t* Wallet Address:- " + response2.toString());

    const wallet2 = await ethers.getContractAt("Wallet", response2, actor2);

    console.log("\t\t\t\t* Items List :- " + (await wallet2.getItems()).toString());
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
}


main().catch(err => {
    console.log(err);
})