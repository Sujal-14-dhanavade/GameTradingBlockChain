// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", actor);
    const response = await Store.listingCustomItems("wallet1", "1", "15");
    await response.wait(1);
    console.log("---------------------------------------------------------")
    const response1 = await Store.getWallet("wallet1");
    console.log("Wallet Address:-" + response1.toString());
    const wallet = await ethers.getContractAt("Wallet", response1, actor);
    const customItemAddress = await wallet.getItem("1");
    console.log("Custom Item Address:-" + customItemAddress.toString());
    console.log("listed Price:- " + (await Store.listedUserMintedItemsToToken(customItemAddress)).toString());
}


main().catch(err => {
    console.log(err);
})