// withdrawing money from tokens
const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
    console.log(
        "------------------------------------------------------------------------"
    );
    console.log(
        "------------------------------------------------------------------------"
    );
    console.log("Deployer withdrawing money from token contract");
    console.log("\n");

    const { deployer } = await getNamedAccounts();
    const provider = ethers.provider;

    console.log(
        "\t\tDeployer address : - " + deployer + " accessing Token contract"
    );
    console.log(
        "\t\t\t* Deployer's Balance before withdraw : - " +
            hre.ethers.utils.formatEther(
                // getBalance returns wei amount, format to ETH amount
                await provider.getBalance(deployer)
            ) +
            " ethers"
    );

    const token = await ethers.getContract("Token", deployer);

    console.log("\t\t\t* Deployer withdrawing money from token contract");

    const response = await token.withDraw();
    await response.wait(1);

    console.log(
        "\t\t\t* Deployer's Balance after withdraw : - " +
            hre.ethers.utils.formatEther(
                // getBalance returns wei amount, format to ETH amount
                await provider.getBalance(deployer)
            ) +
            " ethers"
    );
    console.log(
        "------------------------------------------------------------------------"
    );
    console.log(
        "------------------------------------------------------------------------"
    );
}

main().catch((err) => {
    console.log(err);
});
