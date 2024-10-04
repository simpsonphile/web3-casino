// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

interface ICasino {
  function getBalanceOf(address account) external view returns (uint256);

  function getFromAddressBalance(address _account, uint256 _amount) external;

  function addToAddressBalance(address _account, uint256 _amount) external;

  function getCasinoBalance() external returns (uint256);
}

contract Casino {
  uint256 public balance;
  mapping(address => uint256) private balances;
  mapping(address => bool) private subOwners;
  address public owner;
  address[] public games;

  event Deposit(address indexed account, uint256 amount);
  event Withdraw(address indexed account, uint256 amount);
  event GameAdded(address indexed gameAddress);

  modifier onlyOwner() {
    require(msg.sender == owner, 'Only owner can call this function.');
    _;
  }

  modifier onlySubOwners() {
    require(subOwners[msg.sender], 'Only subOwners can call this function.');
    _;
  }

  constructor() payable {
    owner = msg.sender;

    if (msg.value > 0) {
      balance += msg.value;
    }
  }

  receive() external payable {
    require(msg.value > 0, 'Deposit amount must be greater than zero.');
    balance += msg.value;
  }

  function addSubOwner(address _newSubownerAddress) public onlyOwner {
    subOwners[_newSubownerAddress] = true;
  }

  function getSubowners(address _address) public view onlyOwner returns (bool) {
    return subOwners[_address];
  }

  function deposit() public payable {
    require(msg.value > 0, 'Deposit amount must be greater than zero.');
    balances[msg.sender] += msg.value;
    emit Deposit(msg.sender, msg.value);
  }

  function withdraw(uint256 amount) public {
    require(balances[msg.sender] >= amount, 'Insufficient balance.');
    payable(msg.sender).transfer(amount);
    balances[msg.sender] -= amount;
    emit Withdraw(msg.sender, amount);
  }

  function getCasinoBalance() public view returns (uint256) {
    return balance;
  }

  // Function to check the balance of an account
  function getBalance() public view returns (uint256) {
    return balances[msg.sender];
  }

  // Function to check the balance of any account (only callable by the owner)
  function getBalanceOf(address _account) public view onlySubOwners returns (uint256) {
    return balances[_account];
  }

  function getFromAddressBalance(address _account, uint256 _amount) public onlySubOwners {
    uint256 accountBalance = balances[_account];
    require(accountBalance >= _amount, 'Insufficient balance.');
    balances[_account] -= _amount;
    balance += _amount;
  }

  function addToAddressBalance(address _account, uint256 _amount) public onlySubOwners {
    balances[_account] += _amount;
    balance -= _amount;
  }
}
