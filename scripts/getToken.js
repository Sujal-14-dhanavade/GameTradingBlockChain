// getting token from contract using wallet address

const {getNamedAccounts, ethers} = require("hardhat");

async function main() {
    const {actor} = await getNamedAccounts();
    const wallet = await ethers.getContract("Wallet", actor);
    const token = await ethers.getContract("Token", actor);
    const response = await token.sendToken(wallet.address, {
        value: ethers.utils.parseEther("0.8"),
    });
    await response.wait(1);
    const availableToken = await wallet.availableToken();
    console.log(availableToken.toString());
}


main().catch(err => {
    console.log(err);
})