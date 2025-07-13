const LOCAL_STORAGE_KEY = "keyConfig";

const getDefaultKeyConfig = () => ({
  movement: {
    up: ["KeyW", "ArrowUp"],
    left: ["KeyA", "ArrowLeft"],
    right: ["KeyD", "ArrowRight"],
    down: ["KeyS", "ArrowDown"],
    run: ["ShiftLeft"],
  },
  blackjack: {
    hit: ["KeyH"],
    stand: ["KeyS"],
    double: ["KeyD"],
    halfBet: ["KeyR"],
    doubleBet: ["Digit0"],
    add1: ["Digit1"],
    add2: ["Digit2"],
    add5: ["Digit3"],
    add10: ["Digit4"],
    add25: ["Digit5"],
    add50: ["Digit6"],
    add100: ["Digit7"],
    add500: ["Digit8"],
    accept: ["Enter"],

    exit: ["KeyE"],
  },
  slotMachine: {
    exit: ["KeyE"],
    spin: ["KeyS"],
    increaseBet: ["ArrowUp"],
    decreaseBet: ["ArrowDown"],
    help: ["KeyH"],
    goBack: ["KeyB"],
  },
  plinkoMachine: {
    exit: ["KeyE"],
    play: ["KeyS"],
    increaseBet: ["ArrowUp"],
    decreaseBet: ["ArrowDown"],
    increaseBalls: ["ArrowRight"],
    decreaseBalls: ["ArrowLeft"],
    changeDifficulty: ["KeyD"],
    help: ["KeyH"],
    goBack: ["KeyB"],
  },
  atm: {
    exit: ["KeyE"],
    withdraw: ["KeyQ"],
    deposit: ["KeyR"],
    history: ["KeyH"],
    delete: ["Backspace"],
    accept: ["Enter"],
  },
  navigation: {
    showChat: ["Backquote"],
  },
  zoom: {
    exit: ["KeyE"],
  },
  billiard: {
    hit: ["KeyH"],
  },
});

class KeyConfig {
  constructor() {
    const fromLocalStorage = this.getFromLocalStorage();

    this.keyConfig = fromLocalStorage || getDefaultKeyConfig();

    if (!fromLocalStorage) this.setInLocalStorage();
  }

  reset() {
    this.keyConfig = getDefaultKeyConfig();
    this.setInLocalStorage();
  }

  get() {
    return this.keyConfig;
  }

  checkIfTypeExist(type) {
    return Object.keys(this.keyConfig).includes(type);
  }

  checkIfActionExist(type, action) {
    return Object.keys(this.keyConfig[type]).includes(action);
  }

  update(type, action, values) {
    if (this.checkIfTypeExist(type) && this.checkIfActionExist(type, action)) {
      this.keyConfig[type][action] = values;
      this.setInLocalStorage();
    }
  }

  getFromLocalStorage() {
    const value = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (value) return JSON.parse(value);
    return false;
  }

  setInLocalStorage() {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(this.keyConfig)
    );
  }
}

export default KeyConfig;
