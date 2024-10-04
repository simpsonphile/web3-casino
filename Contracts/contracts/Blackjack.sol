// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import {Casino, ICasino} from './Casino.sol';

contract Blackjack {
  address public owner;
  address public mainContractAddress;

  // prettier-ignore
  uint8[52] private INITIAL_DECK = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 
    39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
  ];

  constructor(address _mainContractAddress) {
    owner = msg.sender;
    mainContractAddress = _mainContractAddress;
  }

  function countPoints(uint8[] memory hand) public pure returns (uint8 totalPoints) {
    uint8 aceCount;

    for (uint i; i < hand.length; i++) {
      uint8 card = hand[i] % 13;

      if (card == 0) {
        aceCount++;
        totalPoints += 11;
      } else if (card >= 10) {
        // J, Q, K
        totalPoints += 10;
      } else {
        totalPoints += card + 1;
      }
    }

    while (totalPoints > 21 && aceCount > 0) {
      totalPoints -= 10;
      aceCount--;
    }

    return totalPoints;
  }

  event GameUpdated(
    address indexed player,
    GameStatus indexed status,
    uint256,
    uint8[],
    uint8[],
    uint256
  );

  enum GameStatus {
    None,
    Pending,
    Won,
    WonEarly,
    Lost,
    Draw
  }

  struct Game {
    uint256 timestamp;
    uint256 betAmount;
    uint8[] bankHand;
    uint8[] playerHand;
    uint8[52] deck;
    uint8 deckTopIndex;
    GameStatus status;
  }

  mapping(address => Game) private currentGames;

  function drawCard() private returns (uint8 card) {
    Game storage game = currentGames[msg.sender];

    // Randomly select an index in the deck
    uint256 randomIndex = uint256(
      keccak256(abi.encodePacked(block.timestamp, msg.sender, game.deckTopIndex))
    ) % (52 - game.deckTopIndex);

    card = game.deck[randomIndex];

    game.deck[randomIndex] = game.deck[51 - game.deckTopIndex];
    game.deckTopIndex++;
  }

  function emitCurrentGame() public {
    emit GameUpdated(
      msg.sender,
      currentGames[msg.sender].status,
      currentGames[msg.sender].betAmount,
      currentGames[msg.sender].bankHand,
      currentGames[msg.sender].playerHand,
      currentGames[msg.sender].timestamp
    );
  }

  function cashOut() internal {
    Game memory game = currentGames[msg.sender];

    ICasino(mainContractAddress).addToAddressBalance(msg.sender, game.betAmount * 2);
  }

  function returnBet() internal {
    Game memory game = currentGames[msg.sender];

    ICasino(mainContractAddress).addToAddressBalance(msg.sender, game.betAmount);
  }

  function bet(uint256 amount) public {
    Game memory game = currentGames[msg.sender];
    require(amount > 0, 'Too small bet amount');
    require(game.status != GameStatus.Pending, 'You already bet');
    require(
      ICasino(mainContractAddress).getCasinoBalance() > amount * 2,
      'Not enough funds in casino'
    );
    require(
      ICasino(mainContractAddress).getBalanceOf(msg.sender) >= amount,
      'You have not enough funds'
    );
    ICasino(mainContractAddress).getFromAddressBalance(msg.sender, amount);

    currentGames[msg.sender] = Game({
      timestamp: block.timestamp,
      betAmount: amount,
      bankHand: new uint8[](0),
      playerHand: new uint8[](0),
      status: GameStatus.Pending,
      deck: INITIAL_DECK,
      deckTopIndex: 0
    });

    currentGames[msg.sender].bankHand.push(drawCard());
    currentGames[msg.sender].playerHand.push(drawCard());
    currentGames[msg.sender].playerHand.push(drawCard());

    uint256 currentPoints = getPlayerPoints();

    if (currentPoints == 21) {
      currentGames[msg.sender].status = GameStatus.WonEarly;
      cashOut();
    }

    emitCurrentGame();
  }

  function getCurrentGame() public view returns (Game memory game) {
    game = currentGames[msg.sender];
  }

  function doubleDown() public {
    Game memory game = currentGames[msg.sender];
    require(game.status == GameStatus.Pending, 'You have no pending games');
    require(game.playerHand.length == 2, 'You can double down only when 2 cards in a hand');

    uint256 balance = ICasino(mainContractAddress).getBalanceOf(msg.sender);

    require(balance > game.betAmount, 'Not enough funds to double down');

    uint256 casinoBalance = ICasino(mainContractAddress).getCasinoBalance();

    require(casinoBalance > game.betAmount, 'Casino has not enough funds for double down your bet');

    ICasino(mainContractAddress).getFromAddressBalance(msg.sender, game.betAmount);

    currentGames[msg.sender].betAmount += game.betAmount;

    currentGames[msg.sender].playerHand.push(drawCard());

    uint256 currentPoints = getPlayerPoints();

    if (currentPoints == 21) {
      currentGames[msg.sender].status = GameStatus.Won;
      cashOut();
      emitCurrentGame();
    } else if (currentPoints > 21) {
      currentGames[msg.sender].status = GameStatus.Lost;
      emitCurrentGame();
    } else {
      pass();
    }
  }

  function hit() public {
    Game memory game = currentGames[msg.sender];

    require(game.status == GameStatus.Pending, 'You have no pending games');

    currentGames[msg.sender].playerHand.push(drawCard());

    uint256 currentPoints = getPlayerPoints();

    if (currentPoints == 21) {
      currentGames[msg.sender].status = GameStatus.Won;
      cashOut();
    } else if (currentPoints > 21) currentGames[msg.sender].status = GameStatus.Lost;

    emitCurrentGame();
  }

  function pass() public {
    Game memory game = currentGames[msg.sender];

    require(game.status == GameStatus.Pending, 'You have no pending games');

    currentGames[msg.sender].bankHand.push(drawCard());

    uint8 currentBankPoints = getBankPoints();
    uint8 currentPoints = getPlayerPoints();

    while (currentBankPoints <= 16) {
      currentGames[msg.sender].bankHand.push(drawCard());
      currentBankPoints = getBankPoints();
    }

    if (currentBankPoints > 21 || currentBankPoints < currentPoints) {
      currentGames[msg.sender].status = GameStatus.Won;
      cashOut();
    } else if (currentBankPoints == 21 || currentBankPoints > currentPoints) {
      currentGames[msg.sender].status = GameStatus.Lost;
    } else {
      currentGames[msg.sender].status = GameStatus.Draw;
      returnBet();
    }

    emitCurrentGame();
  }

  function getBankPoints() public view returns (uint8) {
    return countPoints(currentGames[msg.sender].bankHand);
  }

  function getPlayerPoints() public view returns (uint8) {
    return countPoints(currentGames[msg.sender].playerHand);
  }
}
