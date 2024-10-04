class InteractionHandler {
  constructor() {
    this._handlers = {
      mouseOver: {},
      mouseClick: {},
    };
    this._isEnabled = true;
  }

  setState(state) {
    this._isEnabled = state;
  }

  getState() {
    return this._isEnabled;
  }

  checkIfProperType(type) {
    return ["mouseOver", "mouseClick"].includes(type);
  }

  checkIfInteractionExists(type, name) {
    return this._handlers[type].hasOwnProperty(name);
  }

  isObjectInteractive(object) {
    return object?.userData?.isInteractive;
  }

  getObjectInteractionType(object) {
    return object.userData.interactionType;
  }

  registerInteraction(name, type, handler) {
    if (!this.checkIfProperType(type)) {
      console.warn("not proper type of interaction");
    }

    if (this._handlers[type].hasOwnProperty(name)) {
      console.warn(`handler ${name} exists`);
      return;
    }

    this._handlers[type][name] = handler;
  }

  runInteraction(name, type, data) {
    return this._handlers[type][name](data);
  }

  runObjectInteraction(object, type, data) {
    if (!this.isObjectInteractive(object)) {
      return;
    }

    const interactionName = this.getObjectInteractionType(object);
    if (this.checkIfInteractionExists(type, interactionName)) {
      return this.runInteraction(interactionName, type, data);
    }

    console.warn(
      `interaction ${interactionName} does'nt exist in ${object.name}`
    );
  }
}

export default InteractionHandler;
