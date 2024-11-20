import BlackjackView from "./BlackjackView";

class BlackjackController {
  constructor({ showBlackjackUI, hideBlackjackUI, changeBlackjackUIStep }) {
    this.showBlackjackUI = showBlackjackUI;
    this.hideBlackjackUI = hideBlackjackUI;
    this.changeBlackjackUIStep = changeBlackjackUIStep;

    this.view = null;
    this.roomId = null;

    this.currentStep = null;
  }

  onNewGame(data) {}

  onStepChange(step) {
    this.currentStep = step;
    this.changeBlackjackUIStep(step);
  }

  onTurnChange(id) {
    this.currentTurn = id;

    // this.view.setCurrentTurn(id); //todo
  }

  onPlayerHandUpdate({ id, cardName }) {
    this.view.giveCardToPlayer(id, cardName);
  }

  onPlayerBetUpdate({ id, bet }) {
    this.view.giveChipsToPlayer(id, bet);
  }

  onDealerHandUpdate(cardName) {
    this.view.giveCardToDealer(cardName);
  }

  join({ object3d, roomId, playerId }) {
    this.roomId = roomId;
    window.repo.get(roomId).connect({
      onNewGame: this.onNewGame,
      onStepChange: this.onStepChange,
      onTurnChange: this.onTurnChange,
      onPlayerHandUpdate: this.onPlayerHandUpdate,
      onPlayerBetUpdate: this.onPlayerBetUpdate,
      onDealerHandUpdate: this.onDealerHandUpdate,
    });

    this.view = new BlackjackView({ object3d });

    this.showBlackjackUI();
    this.changeBlackjackUIStep("wait");

    this.playersOrder.push(playerId);
    this.createPlayer(playerId);
  }

  bet(bet) {
    window.repo.get(this.roomId).bet(bet);
  }
  hit() {
    window.repo.get(this.roomId).hit();
  }
  stand() {
    window.repo.get(this.roomId).stand();
  }
  double() {
    window.repo.get(this.roomId).double();
  }

  leave(playerId) {
    this.view.leave(playerId);
    window.repo.get(this.roomId).disconnect();
  }
}

export default BlackjackController;
