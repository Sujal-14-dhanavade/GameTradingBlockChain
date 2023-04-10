// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

contract GameItem {

    // store address of all the owners of particular item as in game one item can be owned by multiple owners
    address[] public owners;

    // attributes related to item
    string public name;
    string public typeOf;
    uint256 public level;
    string public version;

    // initializing item 
    constructor(string memory _name, string memory _typeOf, uint256 _level, string memory _version) {
        name = _name;
        typeOf= _typeOf;
        level = _level;
        version = _version;
    }

    function getName() public view returns(string memory){
        return name;
    }

    function getTypeOf() public view returns(string memory){
        return typeOf;
    }

    function getLevel() public view returns(uint256){
        return level;
    }

    function getVersion() public view returns(string memory){
        return version;
    }

    function getOwner(uint256 index) public view returns(address){
        return owners[index];
    }
    // adding owner if item is sold
    function addOwner(address buyer) public {
        owners.push(buyer);
    }

    // trading item with another item

    function tradeOwner(address buyer, address seller) public {
        for(uint i = 0; i < owners.length; i++) {
            if(owners[i] == seller) {
                owners[i] = buyer;
            }
        }
    }

    function isOwner(address _owner) public view returns(bool) {
        for(uint i = 0; i < owners.length; i++) {
            if(owners[i] == _owner) {
                return true;
            }
        }
        return false;
    }

}