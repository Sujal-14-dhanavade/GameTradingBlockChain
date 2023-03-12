// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

// contains library function for ethereum to usd comparision
import "./PriceConverter.sol";

// wallet contract
import "./Wallet.sol";

// priceFeed contract for conversion
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


// custom errors
error Token_NotOwner();
error Token_NoWalletAddress();

contract Token {
    
    using PriceConverter for uint256;
    uint256 public constant usdPerToken = 20 *  1e18;  // setting usd per token price
    AggregatorV3Interface public priceFeed; // priceFeed contract
    address public immutable owner; // storing owner of token contract

    constructor(address _api) {
        owner = msg.sender;  // initializing owner to whoever deploying contract
        priceFeed = AggregatorV3Interface(_api);
    }

    // removing direct ethereum sending functonalitites
    receive() external payable{
        revert Token_NoWalletAddress();
    } 

    fallback() external payable{
        revert Token_NoWalletAddress();
    }


    // it will send token to particular wallet address when user sends valid price
    function sendToken(address walletAddress) public payable {
        // getting usd sent to contract in the form of ethers
        uint256 usdSent = msg.value.getConversionRate(priceFeed);
        require(usdSent >= usdPerToken, "Didn't Sent enough!");
        Wallet wallet = Wallet(walletAddress);
        uint256 tokenNeedToSend = (usdSent * 1e8) / usdPerToken;
        // sending calculated token to wallet
        wallet.receiveToken(tokenNeedToSend);
    }

    // withdraw functionalities for owner to get all ethereum stored in contract
    function withDraw() public onlyOwner{
        (bool CallSuccess,) = payable(msg.sender).call{value: address(this).balance}("");
        require(CallSuccess, "Call Failed");
    }

    modifier onlyOwner {
        if(msg.sender != owner) {revert Token_NotOwner();}
        _;
    }
}