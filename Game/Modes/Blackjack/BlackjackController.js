import BlackjackView from "./BlackjackView";

class BlackjackController {
  constructor({ showBlackjackUI, hideBlackjackUI, updateBlackjackUI }) {
    this.showBlackjackUI = showBlackjackUI;
    this.hideBlackjackUI = hideBlackjackUI;
    this.updateBlackjackUI = updateBlackjackUI;

    this.view = null;
    this.roomId = null;

    this.currentTurn = null;
    this.currentStep = null;

    this.pendingBet = 0;
  }

  buildCurrentTable(data) {
    // build current players
    const { [this.sessionId]: you, ...them } = data.currentGame;

    Object.entries(them).forEach(([id, player]) => {
      this.view.createPlayer(id);
      console.log(player.cards);
      player.cards.map((card) => this.view.giveCardToPlayer(id, card));
      this.view.giveChipsToPlayer(id, player.bet);
    });

    data.dealerHand.forEach((card) => this.view.giveCardToDealer(card));
  }

  onJoin(data) {
    this.sessionId = window.repo.get(this.roomId).sessionId;
    console.log(data);
    this.updateBlackjackUI(data.step);
    this.buildCurrentTable(data);

    // this.view.setCurrentTurn(turn); //todo

    this.view.createPlayer(this.sessionId);

    this._afterJoin(this.view.getPlayerSeatPosition(this.sessionId));
  }

  onNewPlayer(id) {
    this.view.createPlayer(this.sessionId);
  }

  onNewGame(data) {}

  onStepChange(step) {
    this.currentStep = step;
    this.updateBlackjackUI(step);
  }

  onTurnChange(id) {
    this.currentTurn = id;
    // this.view.setCurrentTurn(turn); //todo
  }

  onPlayerHandUpdate({ id, card }) {
    this.view.giveCardToPlayer(id, card);
    // this.updateBlackjackUI(null, cards)
  }

  onPlayerBetUpdate({ id, bet }) {
    this.view.giveChipsToPlayer(id, bet);
  }

  onPlayerStateUpdate({ id, state }) {
    //todo
  }

  onDealerHandUpdate(card) {
    console.log("on dealer hand update", card);
    this.view.giveCardToDealer(card);
  }

  onEndGameResults(currentGame) {
    console.log("on end game", currentGame);
    this.updateBlackjackUI("result", {
      result: currentGame[this.sessionId].state,
    });
  }

  join({ object3d, roomId, playerId, afterJoin }) {
    this._afterJoin = afterJoin;
    this.roomId = roomId;
    window.repo.get(roomId).connect({
      onJoin: this.onJoin.bind(this),
      onNewPlayer: this.onNewPlayer.bind(this),
      onNewGame: this.onNewGame.bind(this),
      onStepChange: this.onStepChange.bind(this),
      onTurnChange: this.onTurnChange.bind(this),
      onPlayerHandUpdate: this.onPlayerHandUpdate.bind(this),
      onPlayerBetUpdate: this.onPlayerBetUpdate.bind(this),
      onPlayerStateUpdate: this.onPlayerStateUpdate.bind(this),
      onDealerHandUpdate: this.onDealerHandUpdate.bind(this),
      onEndGameResults: this.onEndGameResults.bind(this),
    });

    this.view = new BlackjackView({ object3d });

    this.showBlackjackUI();

    // this.updateBlackjackUI("wait");

    // this.createPlayer(playerId);
  }

  addToPendingBet(bet) {
    this.pendingBet += bet;
  }

  halfPendingBet() {
    this.pendingBet = Math.floor(this.pendingBet / 2);
  }

  doublePendingBet() {
    this.pendingBet *= 2;
  }

  bet() {
    window.repo.get(this.roomId).bet(this.pendingBet);
  }
  hit() {
    console.log("controler hit");
    window.repo.get(this.roomId).hit();
  }
  stand() {
    window.repo.get(this.roomId).stand();
  }
  double() {
    window.repo.get(this.roomId).double();
  }

  leave() {
    this.view.leave(window.repo.get(this.roomId).sessionId);
    window.repo.get(this.roomId).disconnect();
    this.hideBlackjackUI();
  }
}

export default BlackjackController;
