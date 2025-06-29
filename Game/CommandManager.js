const getKeys = (keys) => {
  if (!Array.isArray(keys)) return [keys];
  return keys;
};

const getEmptyCommands = () => ({
  all: {},
  movement: {},
  menu: {},
  blackjack: {},
  slotMachine: {},
  plinkoMachine: {},
  cameraTransition: {},
  zoom: {},
  chat: {},
});

class CommandManager {
  constructor() {
    this._modeStack = [["movement"]];
    this._commands = getEmptyCommands();
  }

  resetCommands() {
    this._commands = getEmptyCommands();
  }

  checkIfModeEnabled(mode) {
    return this.getMode().includes(mode);
  }

  getMode() {
    return this._modeStack[this._modeStack.length - 1] || [];
  }

  getModeStack() {
    return [...this._modeStack];
  }

  checkIfModeExist(mode) {
    const keys = Object.keys(this._commands);
    const allValid = (Array.isArray(mode) ? mode : [mode]).every((m) =>
      keys.includes(m)
    );
    if (!allValid) {
      console.warn(`One or more modes do not exist:`, mode);
      return false;
    }
    return true;
  }

  hasModeInStack(mode) {
    return this._modeStack.some((modeGroup) => modeGroup.includes(mode));
  }

  setMode(mode) {
    if (!this.checkIfModeExist(mode)) return;
    this._modeStack.push(Array.isArray(mode) ? mode : [mode]);
  }

  popMode() {
    if (this._modeStack.length > 1) {
      this._modeStack.pop();
    } else {
      console.warn("Cannot pop initial mode");
    }
  }

  addCommand(mode, actionName, keys, downCommandFn, upCommandFn) {
    if (!this._commands[mode]) {
      this._commands[mode] = {};
    }

    getKeys(keys).forEach((key) => {
      this._commands[mode][key] = { actionName, downCommandFn, upCommandFn };
    });
  }

  executeDown(keys) {
    const modes = this.getMode();
    getKeys(keys).forEach((key) => {
      modes.forEach((mode) => {
        this._commands[mode]?.[key]?.downCommandFn?.();
      });
    });
  }

  executeUp(keys) {
    const modes = this.getMode();
    getKeys(keys).forEach((key) => {
      modes.forEach((mode) => {
        this._commands[mode]?.[key]?.upCommandFn?.();
      });
    });
  }
}

export default CommandManager;
