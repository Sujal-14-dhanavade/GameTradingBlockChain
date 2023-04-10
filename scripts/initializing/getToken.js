// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor, actor2} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", actor2);
    const response = await Store.getWallet("wallet2");
    const wallet = await ethers.getContractAt("Wallet", response, actor2);
    const token = await ethers.getContract("Token", actor2);
    const responseSendToken = await token.sendToken(wallet.address, {
        value: ethers.utils.parseEther("1.80"),
    });
    await responseSendToken.wait(1);
    const availableToken = await wallet.availableToken();
    console.log(availableToken.toString());
}


main().catch(err => {
    console.log(err);
})