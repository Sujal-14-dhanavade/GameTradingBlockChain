// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "./Wallet.sol";
import "./GameItem.sol";

error GameStore_NotValid();
error GameStore_NotOwner();

contract GameStore {

    // this contains game original items
    address[] public storeOriginalItems;

    // this contains account details mapped to particular username
    mapping (string => address) public Wallets;

    // this contains listed game original items mapped to token price
    mapping (address => uint256) public listedStoreItemsToToken;

    // this contains listed custom made items mapped to token price
    mapping (address => uint256) public listedUserMintedItemsToToken;

    // this contains listed custom made items mapped to particular tradable item
    mapping (address => address) public listedUserTradeItemsToItems;

    // owner of the gameStore
    address public immutable owner;

    // initializing the owner of this contract
    constructor() {
        owner = msg.sender;
    } 

    // this creates a new wallet and assign it to whoever created the wallet and map it to name
    function createWallet(string memory name) public {
        // this means wallet already exists
        require(Wallets[name] == address(0), "Wallet exist!!");
        Wallets[name] = address(new Wallet(msg.sender));
    }

    // this gets the wallet already create based on name
    function getWallet(string memory name) public view returns(address){
        require(Wallets[name] != address(0), "Wallet does not exist!!"); // if wallet not exists revert
        Wallet wallet = Wallet(Wallets[name]);
        require(wallet.getOwner() == msg.sender, "Wallet is not owned by you!!!"); // if wallet is not accessed by wallet owner revert
        return Wallets[name];
    }

    // this creates game original items and push it to storeOriginalItems and set token price for item to be listed
    function createItem(string memory _name, string memory _typeOf, uint256 _level, uint256 token)  public onlyOwner {
        address createdItem = address(new GameItem(_name, _typeOf, _level, "classic"));
        storeOriginalItems.push(createdItem);
        listedStoreItemsToToken[createdItem] = token * 1e8;
    }

    // this is for buying store original item 
    function buyItem(string memory name, address gameItem) public {
        // require both the wallet and item to exists
        require(Wallets[name] != address(0) && listedStoreItemsToToken[gameItem] != 0, "Wallet or game item does not exist!!");
        Wallet wallet = Wallet(Wallets[name]);
        // require only wallet owner to make transactions and available Tokens in wallet should be more than listed amount
        require(wallet.getOwner() == msg.sender &&  wallet.availableToken() >= listedStoreItemsToToken[gameItem], "Wallet is not owned by you!!!");
        GameItem item = GameItem(gameItem);
        item.addOwner(address(wallet)); // adding wallet address as owner
        wallet.buyItem(address(item), listedStoreItemsToToken[gameItem]);
    }

    // this creates custome items for user using their wallet address
    function createCustomItems(string memory walletName, string memory _name, string memory _typeOf, uint256 _level)  public {
        // checks wallet exist or not
        require(Wallets[walletName] != address(0), "Wallet or game item does not exist!!");
        Wallet wallet = Wallet(Wallets[walletName]);
        // checks who is accessing wallet
        require(wallet.getOwner() == msg.sender, "Wallet is not owned by you!!!");
        // creating a custom item
        GameItem createdItem = new GameItem(_name, _typeOf, _level, "custom");
        // adding owner of newly created item
        createdItem.addOwner(address(wallet));
        // adding item to owner wallet
        wallet.addCreateItem(address(createdItem));
    }

    modifier onlyOwner {
        if(msg.sender != owner) {revert GameStore_NotOwner();}
        _;
    }

}