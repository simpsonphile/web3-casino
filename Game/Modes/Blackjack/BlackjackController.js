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
  constructor({ dispatchBlackjackUI, views }) {
    this.dispatchBlackjackUI = dispatchBlackjackUI;

    this.roomId = null;

    this.currentTurn = null;
    this.currentStep = null;
    this.views = views;

    this.pendingBet = 0;
  }

  getRemote() {
    return window.repo.get("blackjack");
  }

  getCurrentView() {
    return this.views[this.currentViewName];
  }

  join({ objectName, roomId, afterJoin }) {
    this.currentViewName = objectName;
    this._afterJoin = afterJoin;
    this.roomId = roomId;
    this.getRemote().connect({
      id: roomId,
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

    this.dispatchBlackjackUI({ type: "setVisible", payload: true });
    this.dispatchBlackjackUI({ type: "setStep", payload: "wait" });
  }

  buildCurrentTable(data) {
    const { [this.sessionId]: you, ...them } = data.currentGame;

    Object.entries(them).forEach(([id, player]) => {
      this.getCurrentView().createPlayer(id);
      player.cards.map((card) =>
        this.getCurrentView().giveCardToPlayer(id, card)
      );
      this.getCurrentView().giveChipsToPlayer(id, player.bet);
    });

    data.dealerHand.forEach((card) => this.onDealerHandUpdate(card));
  }

  onJoin(data) {
    this.sessionId = this.getRemote().sessionId;

    this.buildCurrentTable(data);

    this.getCurrentView().createPlayer(this.sessionId);

    this.dispatchBlackjackUI({ type: "setVisible", payload: true });
    this.dispatchBlackjackUI({ type: "setId", payload: this.sessionId });

    this._afterJoin(
      this.getCurrentView().getPlayerSeatPosition(this.sessionId)
    );
  }

  onNewPlayer({ id, nickname }) {
    this.getCurrentView().createPlayer(id);
    this.dispatchBlackjackUI({ type: "newPlayerJoined", payload: nickname });
  }

  onNewGame() {
    this.getCurrentView().resetTable();
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
    this.getCurrentView().giveCardToPlayer(id, card);
    playSound(cardDrop);

    if (id === this.sessionId) {
      this.dispatchBlackjackUI({ type: "addCard", payload: card });
    }
  }

  onPlayerBetUpdate({ id, bet }) {
    this.getCurrentView().giveChipsToPlayer(id, bet);
  }

  onPlayerStateUpdate({ id, state }) {
    if (id === this.sessionId) {
      this.dispatchBlackjackUI({ type: "setPlayerState", payload: state });
    }
  }

  onDealerHandUpdate(card) {
    this.getCurrentView().giveCardToDealer(card);
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
    this.getCurrentView().deletePlayer(id);
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
    this.getRemote().bet(this.pendingBet);
  }

  hit() {
    this.getRemote().hit();
  }
  stand() {
    this.getRemote().stand();
  }
  double() {
    this.getRemote().double();
  }

  leave() {
    this.getCurrentView().deletePlayer(this.getRemote().sessionId);
    this.getRemote().disconnect();
    this.dispatchBlackjackUI({ type: "setVisible", payload: false });
  }
}

export default BlackjackController;
