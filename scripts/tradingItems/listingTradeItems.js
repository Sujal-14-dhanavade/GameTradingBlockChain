// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", actor);
    const getTradableItem = await Store.storeOriginalItems("1");
    const response = await Store.listingTradeItems("wallet1", "0", getTradableItem);
    await response.wait(1);
    console.log("---------------------------------------------------------")
    const trade = await Store.listedUserTradeItemsToItems("0");
    console.log(trade.toString());
    console.log("--------------------------Verifying-------------------------------")
    const response1 = await Store.getWallet("wallet1");
    const wallet = await ethers.getContractAt("Wallet", response1, actor);
    const customItemAddress = await wallet.getItem("0");
    console.log("Given:-" + customItemAddress.toString());
    console.log("Required:- " + getTradableItem.toString());
}


main().catch(err => {
    console.log(err);
})