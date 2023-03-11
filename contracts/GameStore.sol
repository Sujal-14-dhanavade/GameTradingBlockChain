// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "./Wallet.sol";

contract GameStore {
    address[] public gameItems;
    address[] public tradeItem;
    mapping (string => address) public Wallets;
    address public immutable owner;
    constructor() {
        owner = msg.sender;
    } 

    function createWallet(string memory name) public {
        Wallets[name] = address(new Wallet());
    }

    function getWallet(string memory index) public view returns(address){
        return Wallets[index];
    }
}