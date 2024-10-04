// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import {Casino, ICasino} from './Casino.sol';

contract Slots {
  address public owner;
  address public mainContractAddress;

  enum GameStatus {
    Won,
    Lost
  }

  uint8[10] symbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  uint8[10] payouts = [16, 33, 50, 66, 83, 100, 116, 133, 150, 170];

  event GameFinished(
    address indexed player,
    uint256,
    uint8,
    uint8,
    uint8,
    GameStatus indexed status,
    uint256,
    uint256
  );

  constructor(address _mainContractAddress) {
    owner = msg.sender;
    mainContractAddress = _mainContractAddress;
  }

  function randomSymbol(uint256 seed) private view returns (uint8) {
    uint256 symbolIndex = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, seed))) %
      symbols.length;

    return symbols[symbolIndex];
  }

  function bet(uint256 amount) public {
    require(amount > 0, 'Too small bet amount');
    require(
      ICasino(mainContractAddress).getCasinoBalance() > payouts[payouts.length - 1],
      'Not enough funds in casino'
    );
    require(
      ICasino(mainContractAddress).getBalanceOf(msg.sender) >= amount,
      'You have not enough funds'
    );

    ICasino(mainContractAddress).getFromAddressBalance(msg.sender, amount);

    uint8 symbol1 = randomSymbol(1);
    uint8 symbol2 = randomSymbol(2);
    uint8 symbol3 = randomSymbol(3);

    if (
      keccak256(abi.encodePacked(symbol1)) == keccak256(abi.encodePacked(symbol2)) &&
      keccak256(abi.encodePacked(symbol2)) == keccak256(abi.encodePacked(symbol3))
    ) {
      for (uint256 i = 0; i < symbols.length; i++) {
        if (keccak256(abi.encodePacked(symbols[i])) == keccak256(abi.encodePacked(symbol1))) {
          emit GameFinished(
            msg.sender,
            amount,
            symbol1,
            symbol2,
            symbol3,
            GameStatus.Won,
            payouts[i],
            block.timestamp
          );
          ICasino(mainContractAddress).addToAddressBalance(msg.sender, payouts[1]);
          break;
        }
      }
    } else {
      emit GameFinished(
        msg.sender,
        amount,
        symbol1,
        symbol2,
        symbol3,
        GameStatus.Lost,
        0,
        block.timestamp
      );
    }
  }
}
