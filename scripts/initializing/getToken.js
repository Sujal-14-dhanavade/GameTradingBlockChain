// getting token from contract using wallet address which is fetched from map in wallets

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor} = await getNamedAccounts();
    const Store = await ethers.getContract("GameStore", actor);
    const response = await Store.getWallet("wallet1");
    const wallet = await ethers.getContractAt("Wallet", response, actor);
    const token = await ethers.getContract("Token", actor);
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