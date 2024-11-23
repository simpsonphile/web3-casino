import BlackjackView from "./BlackjackView";

const betSound = new Audio("game-assets/sounds/chip-drop.mp3");
const betAccept = new Audio("game-assets/sounds/all-in-chips.mp3");
const cardDrop = new Audio("game-assets/sounds/card-drop.mp3");
const winSound = new Audio("game-assets/sounds/you-win-1.mp3");
const standardSound = new Audio("game-assets/sounds/menu-select.mp3"); // different

const playSound = (sound) => {
  sound.currentTime = 0;
  sound.play();
};

class BlackjackController {
  constructor({ dispatchBlackjackUI }) {
    this.dispatchBlackjackUI = dispatchBlackjackUI;

    this.view = null;
    this.roomId = null;

    this.currentTurn = null;
    this.currentStep = null;

    this.pendingBet = 0;
  }

  join({ object3d, roomId, afterJoin }) {
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
      onBetAccepted: this.onBetAccepted.bind(this),
      onHitAccepted: this.onHitAccepted.bind(this),
      onStandAccepted: this.onStandAccepted.bind(this),
      onDeletePlayer: this.onDeletePlayer.bind(this),
    });

    this.view = new BlackjackView({ object3d });

    this.dispatchBlackjackUI({ type: "setVisible", payload: true });
    this.dispatchBlackjackUI({ type: "setStep", payload: "wait" });
  }

  buildCurrentTable(data) {
    const { [this.sessionId]: you, ...them } = data.currentGame;

    Object.entries(them).forEach(([id, player]) => {
      this.view.createPlayer(id);
      player.cards.map((card) => this.view.giveCardToPlayer(id, card));
      this.view.giveChipsToPlayer(id, player.bet);
    });

    data.dealerHand.forEach((card) => this.onDealerHandUpdate(card));
  }

  onJoin(data) {
    this.sessionId = window.repo.get(this.roomId).sessionId;

    this.buildCurrentTable(data);

    this.view.createPlayer(this.sessionId);

    this.dispatchBlackjackUI({ type: "setVisible", payload: true });
    this.dispatchBlackjackUI({ type: "setId", payload: this.sessionId });

    this._afterJoin(this.view.getPlayerSeatPosition(this.sessionId));
  }

  onNewPlayer({ id, nickname }) {
    this.view.createPlayer(id);
    this.dispatchBlackjackUI({ type: "newPlayerJoined", payload: nickname });
  }

  onNewGame() {
    this.view.resetTable();
    this.dispatchBlackjackUI({ type: "reset" });
    this.dispatchBlackjackUI({ type: "setVisible", payload: true });
    this.dispatchBlackjackUI({ type: "setBet", payload: this.pendingBet });
  }

  onStepChange(step) {
    this.currentStep = step;
    this.dispatchBlackjackUI({ type: "setStep", payload: step });
  }

  onTurnChange(id) {
    this.currentTurn = id;

    this.dispatchBlackjackUI({ type: "setTurn", payload: this.currentTurn });
  }

  onPlayerHandUpdate({ id, card }) {
    this.view.giveCardToPlayer(id, card);
    playSound(cardDrop);

    if (id === this.sessionId) {
      this.dispatchBlackjackUI({ type: "addCard", payload: card });
    }
  }

  onPlayerBetUpdate({ id, bet }) {
    this.view.giveChipsToPlayer(id, bet);
  }

  onPlayerStateUpdate({ id, state }) {
    if (id === this.sessionId) {
      this.dispatchBlackjackUI({ type: "setPlayerState", payload: state });
    }
  }

  onDealerHandUpdate(card) {
    this.view.giveCardToDealer(card);
    this.dispatchBlackjackUI({ type: "addDealerCard", payload: card });
    playSound(cardDrop);
  }

  onEndGameResults(currentGame) {
    this.dispatchBlackjackUI({ type: "setStep", payload: "result" });
    this.dispatchBlackjackUI({
      type: "setResult",
      payload: currentGame[this.sessionId].state,
    });
    if (["win", "win-early"].includes(currentGame[this.sessionId].state)) {
      playSound(winSound);
    }
  }

  onBetAccepted() {
    this.dispatchBlackjackUI({ type: "setHasBeaten" });
    playSound(betAccept);
  }

  onHitAccepted() {
    this.dispatchBlackjackUI({ type: "setHasHit" });
    playSound(standardSound);
  }

  onStandAccepted() {
    this.dispatchBlackjackUI({ type: "setHasStand" });
    playSound(standardSound);
  }

  onDeletePlayer(id) {
    this.view.deletePlayer(id);
  }

  setPendingBet(bet) {
    this.pendingBet = bet;

    this.dispatchBlackjackUI({ type: "setBet", payload: this.pendingBet });
    playSound(betSound);
  }

  addToPendingBet(bet) {
    const newBet = this.pendingBet + bet;
    this.setPendingBet(newBet);
  }

  halfPendingBet() {
    const newBet = Math.floor(this.pendingBet / 2);
    this.setPendingBet(newBet);
  }

  doublePendingBet() {
    const newBet = this.pendingBet * 2;
    this.setPendingBet(newBet);
  }

  bet() {
    window.repo.get(this.roomId).bet(this.pendingBet);
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

  leave() {
    this.view.deletePlayer(window.repo.get(this.roomId).sessionId);
    window.repo.get(this.roomId).disconnect();
    this.dispatchBlackjackUI({ type: "setVisible", payload: false });
  }
}

export default BlackjackController;
