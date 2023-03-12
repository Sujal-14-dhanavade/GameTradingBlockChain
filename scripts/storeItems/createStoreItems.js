// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {deployer} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", deployer);
    const responseItem1 = await Store.createItem("Pikachu", "Electric", "5", "10");
    await responseItem1.wait(1);
    const responseItem2 = await Store.createItem("Charmander", "Fire", "5", "10");
    await responseItem2.wait(1);
    const responseItem3 = await Store.createItem("Squartle", "Water", "5", "10");
    await responseItem3.wait(1);
    const responseItem4 = await Store.createItem("Bulbasaur", "Grass", "5", "10");
    await responseItem4.wait(1);
    console.log("4 store original items created -----------------------------------");
}


main().catch(err => {
    console.log(err);
})