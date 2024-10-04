// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import {Casino, ICasino} from './Casino.sol';

contract Plinko {
  address public mainContractAddress;
  address public owner;

  enum Difficulty {
    Easy,
    Medium,
    Hard
  }

  mapping(Difficulty => uint16[7]) public difficultyLevels;
  uint8 multiplierDivision = 10;
  uint32[7] private cumulativeSums = [48, 634, 3856, 14698, 38868, 77540, 100100];
  uint32 sum = 100000;

  event BetBatchFinish(
    address indexed player,
    uint256,
    uint256,
    uint16[] multipliers,
    Difficulty,
    uint256
  );

  constructor(address _mainContractAddress) {
    owner = msg.sender;
    mainContractAddress = _mainContractAddress;
    difficultyLevels[Difficulty.Easy] = [110, 32, 16, 12, 11, 10, 5];
    difficultyLevels[Difficulty.Medium] = [250, 80, 31, 17, 12, 7, 3];
    difficultyLevels[Difficulty.Hard] = [1410, 250, 81, 23, 7, 2, 0];
  }

  function batchBets(uint256 betAmount, uint8 betCount, Difficulty difficulty) public {
    uint256 sumBetAmount = betAmount * betCount;
    require(betCount > 0 && betCount <= 100, 'n of bets between 0 and 100');
    require(betAmount > 0, 'Too small bet amount');
    uint16[7] memory multipliers = difficultyLevels[difficulty];
    require(
      ICasino(mainContractAddress).getCasinoBalance() >
        (betAmount * betCount * multipliers[multipliers.length - 1]) / multiplierDivision,
      'Not enough funds in casino'
    );
    require(
      ICasino(mainContractAddress).getBalanceOf(msg.sender) >= sumBetAmount,
      'You have not enough funds'
    );

    uint16[] memory multipliersMemory = new uint16[](betCount);
    uint256 payoutSum = 0;
    for (uint16 i = 0; i < betCount; i++) {
      uint16 multiplier = selectMultiplier(i, difficulty);
      uint256 payout = getMultipliedBetAmount(betAmount, multiplier);
      payoutSum += payout;
      multipliersMemory[i] = multiplier;
    }

    if (payoutSum > sumBetAmount) {
      ICasino(mainContractAddress).addToAddressBalance(msg.sender, payoutSum - sumBetAmount);
    } else if (payoutSum < sumBetAmount) {
      ICasino(mainContractAddress).getFromAddressBalance(msg.sender, sumBetAmount - payoutSum);
    }

    emit BetBatchFinish(
      msg.sender,
      betAmount,
      payoutSum,
      multipliersMemory,
      difficulty,
      block.timestamp
    );
  }

  // Function to get a random number between 0 and max (inclusive)
  function getRandomNumber(uint32 max, uint16 nonce) public view returns (uint32) {
    require(max > 0, 'max must be greater than 0');

    // Generate a pseudo-random number using block variables and sender address
    uint256 random = uint256(
      keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender, nonce))
    );

    // Ensure the random number is between 0 and max (inclusive)
    return uint32(random % (max + 1));
  }

  // Function to select a chance based on a random number
  function selectMultiplier(uint16 nonce, Difficulty difficulty) private view returns (uint16) {
    uint16[7] memory multipliers = difficultyLevels[difficulty];
    uint32 randomNumber = getRandomNumber(sum, nonce);

    for (uint8 i = 0; i < cumulativeSums.length; i++) {
      if (randomNumber < cumulativeSums[i]) {
        return multipliers[i];
      }
    }

    revert('No chance selected');
  }

  function getMultipliedBetAmount(
    uint256 betAmount,
    uint16 multiplier
  ) private view returns (uint256) {
    return (betAmount * multiplier) / multiplierDivision;
  }
}
