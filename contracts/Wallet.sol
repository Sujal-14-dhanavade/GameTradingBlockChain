// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "./GameItem.sol";


error Wallet_NotOwner();

contract Wallet {
    
    // default token = 10 per wallet account
    uint256 private gameToken = 10 * 1e8;
    uint256 private constant decimal = 1e8; // decimal point for token
    address private owner; // owner of wallet
    address[] private ownedItems;    // items owned by this account
    
    
    // setting owner of wallet
    constructor (address _owner) {
        owner = _owner;
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

    // incrementing tokens received by token contract
    function receiveToken(uint256 tokens) external {
        gameToken += tokens;
    }

    // buying item based on item address and decrementing its price
    function buyItem(address item, uint256 sellingToken) external {
        gameToken -= sellingToken;
        ownedItems.push(item);
    }

    function addCreateItem(address item) external {
        ownedItems.push(item);
    }

    function swapItem(address itemSwapped, address newItem) external {
        for(uint i = 0; i < ownedItems.length; i++) {
            if(ownedItems[i] == itemSwapped) {
                ownedItems[i] = newItem;
            }
        }
    }
}