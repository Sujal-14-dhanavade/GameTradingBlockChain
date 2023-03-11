// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {

    function getPrice(AggregatorV3Interface priceFeed) internal view returns(uint256){
        
        (, int price,,,) = priceFeed.latestRoundData();
       
        return uint256(price);
    }


    function getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
       
        uint256 ethAmountUsd = ethPrice * ethAmount / 1e8;
        return ethAmountUsd;
    }
}