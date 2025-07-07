const playSound = (name) => {
  window.soundPlayer.playSound(name);
};

class BlackjackController {
  constructor({ views }) {
    this.roomId = null;

    this.currentTurn = null;
    this.currentStep = null;
    this.views = views;

    this.pendingBet = 0;

    this.blackjackStore = window.blackjackStore.getState();
  }

  getRemote() {
    return window.repo.get("blackjack");
  }

  getCurrentView() {
    return this.views[this.currentViewName];
  }

  getView(name) {
    return this.views[name];
  }

  async join({ objectName, roomId, afterJoin }) {
    this.currentViewName = objectName;
    this._afterJoin = afterJoin;
    this.roomId = roomId;
    const success = await this.getRemote().connect({
      id: roomId,
      balance: window.userStore.getState().guestBalance,
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
      onBalanceUpdated: this.onBalanceUpdated.bind(this),
      onGuestBalanceUpdated: this.onGuestBalanceUpdated.bind(this),
    });

    if (!success) return false;

    this.blackjackStore.setVisible(true);
    this.blackjackStore.setStep("wait");

    return true;
  }

  buildCurrentTable(data) {
    const { [this.sessionId]: _, ...them } = data.currentGame;

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

    this.blackjackStore.setVisible(true);
    this.blackjackStore.setId(this.sessionId);

    this._afterJoin(
      this.getCurrentView().getPlayerSeatPosition(this.sessionId)
    );
  }

  onNewPlayer({ id, nickname }) {
    this.getCurrentView().createPlayer(id);
    this.blackjackStore.newPlayerJoined(nickname);
  }

  onNewGame() {
    this.getCurrentView().resetTable();
    this.blackjackStore.reset();
    this.blackjackStore.setVisible(true);
    this.blackjackStore.setBet(this.pendingBet);
  }

  onStepChange(step) {
    this.currentStep = step;
    this.blackjackStore.setStep(step);
  }

  onTurnChange(id) {
    this.currentTurn = id;

    this.blackjackStore.setTurn(this.currentTurn);
  }

  onPlayerHandUpdate({ id, card }) {
    this.getCurrentView().giveCardToPlayer(id, card);
    playSound("cardDrop");

    if (id === this.sessionId) {
      this.blackjackStore.addCard(card);
    }
  }

  onPlayerBetUpdate({ id, bet }) {
    this.getCurrentView().giveChipsToPlayer(id, bet);
  }

  onPlayerStateUpdate({ id, state }) {
    if (id === this.sessionId) {
      this.blackjackStore.setPlayerState(state);
    }
  }

  onDealerHandUpdate(card) {
    this.getCurrentView().giveCardToDealer(card);
    this.blackjackStore.addDealerCard(card);
    playSound("cardDrop");
  }

  onEndGameResults(currentGame) {
    this.blackjackStore.setStep("result");
    this.blackjackStore.setResult(currentGame[this.sessionId].state);

    if (["win", "blackjack"].includes(currentGame[this.sessionId].state)) {
      playSound("winSound");
    }
  }

  onBetAccepted() {
    this.blackjackStore.setHasBeaten();
    playSound("betAccept");
  }

  onHitAccepted() {
    this.blackjackStore.setHasHit();
    playSound("standardSound");
  }

  onStandAccepted() {
    this.blackjackStore.setHasStand();
    playSound("standardSound");
  }

  onDeletePlayer(id) {
    this.getCurrentView().deletePlayer(id);
  }

  onBalanceUpdated() {
    window.userStore.getState().refreshBalance();
  }

  onGuestBalanceUpdated({ change }) {
    window.userStore.getState().addToGuestBalance(change);
  }

  setPendingBet(bet) {
    this.pendingBet = bet;

    this.blackjackStore.setBet(this.pendingBet);
    playSound("betSound");
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
    const view = this.getCurrentView();
    view.deletePlayer(this.getRemote().sessionId);
    view.resetTable();
    this.getRemote().disconnect();
    this.blackjackStore.setVisible(false);
  }
}

export default BlackjackController;
