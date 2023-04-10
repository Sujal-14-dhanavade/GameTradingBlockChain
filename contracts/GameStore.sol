// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "./Wallet.sol";
import "./GameItem.sol";

error GameStore_NotValid();
error GameStore_NotOwner();

contract GameStore {

    struct Trade {
        address trader;
        address item;
        address itemNeeded;
    }
    // this contains game original items
    address[] public storeOriginalItems;

    // this contains custom items
    address[] public storeCustomItems;

    // this contains account details mapped to particular username
    mapping (string => address) public Wallets;

    // this contains listed game original items mapped to token price
    mapping (address => uint256) public listedStoreItemsToToken;

    // this contains listed custom made items mapped to token price
    mapping (address => uint256) public listedUserMintedItemsToToken;

    // this contains listed custom made items mapped to particular tradable item
    Trade[] public listedUserTradeItemsToItems;
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
    function buyOriginalItem(string memory name, address gameItem) public {
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
        // have a reference of custom item with gameStore
        storeCustomItems.push(address(createdItem));
        // adding owner of newly created item
        createdItem.addOwner(address(wallet));
        // adding item to owner wallet
        wallet.addCreateItem(address(createdItem));
    }

    function listingCustomItems(string memory walletName, uint256 index, uint256 token) public {
        // checks wallet exist or not
        require(Wallets[walletName] != address(0), "Wallet or game item does not exist!!");
        Wallet wallet = Wallet(Wallets[walletName]);
        // checks who is accessing wallet
        require(wallet.getOwner() == msg.sender, "Wallet is not owned by you!!!");
        //listing custom items
        GameItem item = GameItem(wallet.getItem(index));
        require(keccak256(abi.encode(item.getVersion())) != keccak256(abi.encode("classic")), "Only Custom Item can be listed");
        listedUserMintedItemsToToken[address(item)] = token * 1e8;
    }

    function buyCustomItems(string memory walletName, address customItem) public{
        // checks wallet exist or not
        require(Wallets[walletName] != address(0), "Wallet or game item does not exist!!");
        Wallet wallet = Wallet(Wallets[walletName]);
        // checks who is accessing wallet and whether token is enough or not
        require(wallet.getOwner() == msg.sender &&  wallet.availableToken() >= listedUserMintedItemsToToken[customItem], "Wallet is not owned by you or you don't have enough tokens!!!");
        GameItem item = GameItem(customItem);
        require(wallet.getOwner() != item.owners(0), "Item Creator cannot buy custom item!!!");
        item.addOwner(address(wallet)); // adding wallet address as owner
        wallet.buyItem(address(item), listedUserMintedItemsToToken[customItem]);
        
        // owner Wallet
        Wallet ownerWallet = Wallet(item.getOwner(0));
        ownerWallet.receiveToken(listedUserMintedItemsToToken[customItem]);
    }


    function listingTradeItems(string memory walletName, uint256 index, address tradableItem) public {
        // checks wallet exist or not
        require(Wallets[walletName] != address(0), "Wallet or game item does not exist!!");
        Wallet wallet = Wallet(Wallets[walletName]);
        // checks who is accessing wallet
        require(wallet.getOwner() == msg.sender, "Wallet is not owned by you!!!");

        // listing custom items
        GameItem item = GameItem(wallet.getItem(index));

        Trade memory info = Trade(address(wallet), address(item), tradableItem);
        // listing item for trade with another item
        listedUserTradeItemsToItems.push(info);
    }

    function tradeItem(string memory tradeAcceptorWalletName, uint256 index) public {
        // checks wallet exist or not
        require(Wallets[tradeAcceptorWalletName] != address(0), "Wallet or game item does not exist!!");
        Wallet wallet = Wallet(Wallets[tradeAcceptorWalletName]);
        // checks who is accessing wallet
        require(wallet.getOwner() == msg.sender, "Wallet is not owned by you!!!");

        // trade info of particular trading request
        Trade memory info = listedUserTradeItemsToItems[index];

        // walet of request owner
        Wallet walletTrade = Wallet(info.trader);
        // item listed for trading
        GameItem item = GameItem(info.item);
        // item required for trading
        GameItem itemNeeded = GameItem(info.itemNeeded);
        // if tradeacceptor don't have required item then revert
        require(itemNeeded.isOwner(address(wallet)), "You don't have required item!!!!");
        // swap owner for item 
        item.tradeOwner(address(wallet), info.trader);
        itemNeeded.tradeOwner(info.trader, address(wallet));
        // swap items for wallet
        wallet.swapItem(address(itemNeeded), address(item));
        walletTrade.swapItem( address(item), address(itemNeeded));
        
        // removing trade info
        Trade memory temp = listedUserTradeItemsToItems[index];
        listedUserTradeItemsToItems[index] = listedUserTradeItemsToItems[listedUserTradeItemsToItems.length - 1];
        listedUserTradeItemsToItems[listedUserTradeItemsToItems.length - 1] = temp;
        listedUserTradeItemsToItems.pop();
    }
    
    modifier onlyOwner {
        if(msg.sender != owner) {revert GameStore_NotOwner();}
        _;
    }
}