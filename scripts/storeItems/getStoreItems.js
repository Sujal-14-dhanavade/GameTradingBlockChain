

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", actor);
    const item1Address = await Store.storeOriginalItems("0");
    console.log(item1Address);
    const item1 = await ethers.getContractAt("GameItem", item1Address, actor);
    console.log((await item1.getName()).toString());   
    console.log((await item1.getTypeOf()).toString()); 
    console.log((await item1.getLevel()).toString()); 
    console.log((await item1.getVersion()).toString()); 
}


main().catch(err => {
    console.log(err);
})