// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "./PriceConverter.sol";
import "./Wallet.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


error Token_NotOwner();
error Token_NoWalletAddress();

contract Token {
    
    using PriceConverter for uint256;
    uint256 public constant usdPerToken = 20 *  1e18;  // 20.[18zeroes]
    AggregatorV3Interface public priceFeed;
    address public immutable owner;

    constructor(address _api) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(_api);
    }

    receive() external payable{
        revert Token_NoWalletAddress();
    } 

    fallback() external payable{
        revert Token_NoWalletAddress();
    }

    function sendToken(address walletAddress) public payable {
        uint256 usdSent = msg.value.getConversionRate(priceFeed);
        require(usdSent >= usdPerToken, "Didn't Sent enough!");
        Wallet wallet = Wallet(walletAddress);
        uint256 tokenNeedToSend = usdSent * 1e8 / usdPerToken;
        wallet.receiveToken(tokenNeedToSend);
    }

    function withDraw() public onlyOwner{
        (bool CallSuccess,) = payable(msg.sender).call{value: address(this).balance}("");
        require(CallSuccess, "Call Failed");
    }

    modifier onlyOwner {
        if(msg.sender != owner) {revert Token_NotOwner();}
        _;
    }
}