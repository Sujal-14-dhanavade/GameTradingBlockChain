// store price feed addresses depending on network on the basis
// of chainId 5 is for goerli

const networkConfig = {
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e"
    }
}

module.exports = networkConfig;