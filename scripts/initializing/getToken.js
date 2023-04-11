// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
    console.log("Buying Token from Token Contract using Ethers....");
    console.log("\n");

    const {actor, actor2} = await getNamedAccounts();

    console.log("\t\tUser A address : - " + actor + " accessing GameStore contract");

    const Store = await ethers.getContract("GameStore", actor);

    console.log("\t\t\t* User A getting wallet info for wallet1");

    const response = await Store.getWallet("wallet1");

    console.log("\t\t\t* Wallet1's address :- " + response.toString());

    const wallet = await ethers.getContractAt("Wallet", response, actor);
    const availableToken = await wallet.availableToken();

    console.log("\t\t\t* Token Remaining in Wallet1 is: " + parseFloat(availableToken.toString()) / 1e8 + " Game Tokens");
    console.log("\t\t\t* User A address : - " + actor + " accessing Token contract");

    const token = await ethers.getContract("Token", actor);

    console.log("\t\t\t* User A sending 1.80 ethers for buying token");

    const responseSendToken = await token.sendToken(wallet.address, {
        value: ethers.utils.parseEther("1.80"),
    });
    await responseSendToken.wait(1);
    const newToken = await wallet.availableToken();

    console.log("\t\t\t* Tokens in Wallet1 after buying is: " + parseFloat(newToken.toString()) / 1e8 + " Game Tokens");
    console.log("------------------------------------------------------------------------");
    console.log("\t\tUser B address : - " + actor2 + " accessing GameStore contract");
    
    const Store1 = await ethers.getContract("GameStore", actor2);
    
    console.log("\t\t\t* User B getting wallet info for wallet2");
    
    const response1 = await Store1.getWallet("wallet2");

    console.log("\t\t\t* Wallet2's address :- " + response1.toString());

    const wallet1 = await ethers.getContractAt("Wallet", response1, actor2);
    const availableToken1 = await wallet1.availableToken();

    console.log("\t\t\t* Token Remaining in Wallet2 is: " + parseFloat(availableToken1.toString()) / 1e8 + " Game Tokens");
    console.log("\t\t\t* User B address : - " + actor2 + " accessing Token contract");

    const token1 = await ethers.getContract("Token", actor2);

    console.log("\t\t\t* User B sending 1 ether for buying token");

    const responseSendToken1 = await token1.sendToken(wallet1.address, {
        value: ethers.utils.parseEther("1"),
    });
    await responseSendToken1.wait(1);
    const newToken1 = await wallet1.availableToken();
    
    console.log("\t\t\t* Tokens in Wallet1 after buying is: " + parseFloat(newToken1.toString()) / 1e8 + " Game Tokens");
    console.log("------------------------------------------------------------------------");
    console.log("------------------------------------------------------------------------");
}


main().catch(err => {
    console.log(err);
})