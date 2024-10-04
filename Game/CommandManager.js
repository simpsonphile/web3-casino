const getKeys = (keys) => {
  if (!Array.isArray(keys)) return [keys];
  return keys;
};

const getEmptyCommands = () => ({
  all: {},
  movement: {},
  menu: {},
  blackjack: {},
  cameraTransition: {},
  zoom: {},
});

class CommandManager {
  constructor() {
    this._prevMode = null;
    this._mode = ["movement"];

    this._commands = getEmptyCommands();
  }

  resetCommands() {
    this._commands = getEmptyCommands();
  }

  checkIfModeEnabled(str) {
    return this._mode.includes(str);
  }

  getMode() {
    return this._mode;
  }

  getPrevMode() {
    return this._prevMode;
  }

  setToPrevMode() {
    this._mode = this._prevMode;
  }

  checkIfModeExist(mode) {
    if (!Object.keys(this._commands).includes(mode))
      console.warn(`Mode ${mode} does not exist`);

    return true;
  }

  setMode(mode) {
    if (!this.checkIfModeExist(mode)) return;
    this._prevMode = this._mode;
    this._mode = Array.isArray(mode) ? mode : [mode];
  }

  addCommand(mode, actionName, keys, downCommandFn, upCommandFn) {
    if (!this._commands[mode]) {
      this._commands[mode] = {};
    }

    keys.forEach((key) => {
      this._commands[mode][key] = { actionName, downCommandFn, upCommandFn };
    });
  }

  executeDown(keys) {
    getKeys(keys).forEach((key) => {
      this._mode.forEach((mode) => {
        this._commands[mode]?.[key]?.downCommandFn?.();
      });
    });
  }

  executeUp(keys) {
    getKeys(keys).forEach((key) => {
      this._mode.forEach((mode) => {
        this._commands[mode]?.[key]?.upCommandFn?.();
      });
    });
  }
}

export default CommandManager;
