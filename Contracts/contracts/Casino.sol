// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CasinoCoin.sol";

interface ICasino {
    function getBalanceOf(address account) external view returns (uint256);

    function getFromAddressBalance(address _account, uint256 _amount) external;

    function addToAddressBalance(address _account, uint256 _amount) external;

    function getCasinoBalance() external returns (uint256);
}

contract Casino {
    uint256 public constant NATIVE_TO_CHIP_RATE = 100000;

    ICasinoCoin public casinoToken;

    mapping(address => bool) private subOwners;

    address public owner;

    event Deposit(address indexed account, uint256 amount);
    event Withdraw(address indexed account, uint256 amount);
    event GameAdded(address indexed gameAddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlySubOwners() {
        require(subOwners[msg.sender], "Only subOwners");
        _;
    }

    constructor(address _tokenAddress) payable {
        owner = msg.sender;
        casinoToken = ICasinoCoin(_tokenAddress);
        addSubOwner(owner);
    }

    function addSubOwner(address _newSubownerAddress) public onlyOwner {
        subOwners[_newSubownerAddress] = true;
    }

    function getSubowners(
        address _address
    ) public view onlyOwner returns (bool) {
        return subOwners[_address];
    }

    function deposit() public payable {
        require(msg.value > 1e15, "Minimum deposit is 0.001");

        uint256 chipAmount = msg.value * NATIVE_TO_CHIP_RATE;

        casinoToken.mint(msg.sender, chipAmount);

        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public {
        require(amount > 0, "Amount must be > 0");
        require(
            casinoToken.balanceOf(msg.sender) >= amount,
            "Insufficient balance"
        );
        uint256 nativeAmount = amount / NATIVE_TO_CHIP_RATE;
        require(nativeAmount > 0, "Amount too low to convert");
        require(
            address(this).balance >= nativeAmount,
            "Insufficient contract balance"
        );

        casinoToken.burnFrom(msg.sender, amount);

        payable(msg.sender).transfer(nativeAmount);

        emit Withdraw(msg.sender, amount);
    }

    function getCasinoBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getBalance() public view returns (uint256) {
        return casinoToken.balanceOf(msg.sender);
    }

    function getBalanceOf(
        address _account
    ) public view onlySubOwners returns (uint256) {
        return casinoToken.balanceOf(_account);
    }

    function getFromAddressBalance(
        address _account,
        uint256 _amount
    ) public onlySubOwners {
        require(
            casinoToken.balanceOf(_account) >= _amount,
            "Insufficient user balance"
        );
        casinoToken.burnFrom(_account, _amount);
    }

    function addToAddressBalance(
        address _account,
        uint256 _amount
    ) public onlySubOwners {
        casinoToken.mint(_account, _amount);
    }
}
