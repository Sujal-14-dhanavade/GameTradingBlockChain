// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
    console.log("Owner of GameStore creating store original items....");
    console.log("\n");

    const {deployer} = await getNamedAccounts();

    console.log("\t\tDeployer address : - " + deployer + " accessing GameStore contract");

    const Store = await ethers.getContract("GameStore", deployer);

    console.log("\t\t\t* Deployer creating store original item 1 :- " + JSON.stringify({"name": "Pikachu", "type": "Electric", "Level": "5", "Price": "10"}));

    const responseItem1 = await Store.createItem("Pikachu", "Electric", "5", "10");
    await responseItem1.wait(1);

    console.log("\t\t\t* Item 1 created");
    console.log("\t\t\t* Deployer creating store original item 2 :- " + JSON.stringify({"name": "Charmander", "type": "Fire", "Level": "5", "Price": "10"}));

    const responseItem2 = await Store.createItem("Charmander", "Fire", "5", "10");
    await responseItem2.wait(1);

    console.log("\t\t\t* Item 2 created");
    console.log("\t\t\t* Deployer creating store original item 3 :- " + JSON.stringify({"name": "Squartle", "type": "Water", "Level": "5", "Price": "10"}));

    const responseItem3 = await Store.createItem("Squartle", "Water", "5", "10");
    await responseItem3.wait(1);

    console.log("\t\t\t* Item 3 created");
    console.log("\t\t\t* Deployer creating store original item 4 :- " + JSON.stringify({"name": "Bulbasaur", "type": "Grass", "Level": "5", "Price": "10"}));

    const responseItem4 = await Store.createItem("Bulbasaur", "Grass", "5", "10");
    await responseItem4.wait(1);
    console.log("\t\t\t* Item 4 created");
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
}


main().catch(err => {
    console.log(err);
})