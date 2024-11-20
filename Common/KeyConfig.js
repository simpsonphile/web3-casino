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
    exit: ["KeyE"],
  },
  atm: {
    exit: ["KeyE"],
    withdraw: ["KeyW"],
    deposit: ["KeyD"],
    delete: ["Backspace"],
    accept: ["Enter"],
  },
  navigation: {
    showChat: ["Backquote"],
  },
  zoom: {
    exit: ["KeyE"],
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
