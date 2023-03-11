// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "./GameItem.sol";

contract Wallet {
    
    uint256 private gameToken = 10 * 1e8;
    uint256 private constant decimal = 1e8;
    address private owner;
    address[] private ownedItems;    
    
    
    constructor () {
        owner = msg.sender;
    }

    function getOwner() public view returns(address) {
        return owner;
    } 

    function availableToken() public view returns(uint256) {
        return gameToken;
    }

    function getItem(uint256 index) public view returns(address) {
        return ownedItems[index];
    } 

    function receiveToken(uint256 tokens) public {
        gameToken += tokens;
    }
}