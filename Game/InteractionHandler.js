class InteractionHandler {
  constructor() {
    this._handlers = {
      mouseOver: {},
      mouseClick: {},
      mouseLeave: {},
    };
    this._isEnabled = true;
    this._lastIntersect = null;
  }

  setState(state) {
    this._isEnabled = state;
  }

  getState() {
    return this._isEnabled;
  }

  checkIfProperType(type) {
    return Object.hasOwn(this._handlers, type);
  }

  checkIfInteractionExists(type, name) {
    return Object.hasOwn(this._handlers[type], name);
  }

  hasInteractionForIntersect(intersect, type) {
    const object = intersect?.object;
    if (!this.isObjectInteractive(object)) return false;

    const interactionName = this.getObjectInteractionType(object);
    return (
      interactionName && this.checkIfInteractionExists(type, interactionName)
    );
  }

  isObjectInteractive(object) {
    return !!this.getObjectInteractionType(object);
  }

  getObjectInteractionType(object) {
    return object.userData.interactionType;
  }

  registerInteraction(name, type, handler) {
    if (!this.checkIfProperType(type)) {
      console.warn("not proper type of interaction");
    }

    if (Object.hasOwn(this._handlers[type], name)) {
      console.warn(`handler ${name} exists`);
      return;
    }

    this._handlers[type][name] = handler;
  }

  runInteraction(name, type, data) {
    return this._handlers[type][name](data);
  }

  runObjectInteraction(intersect, type) {
    const object = intersect?.object;
    if (!this.isObjectInteractive(object)) {
      return;
    }

    const interactionName = this.getObjectInteractionType(object);
    if (this.checkIfInteractionExists(type, interactionName)) {
      return this.runInteraction(interactionName, type, intersect);
    }

    console.warn(
      `interaction ${interactionName} of type ${type} does'nt exist in ${object.name}`
    );
  }

  handleHover(intersect) {
    const obj = intersect?.object;
    const lastObj = this._lastIntersect?.object;

    if (
      this._lastIntersect &&
      lastObj !== obj &&
      this.hasInteractionForIntersect(this._lastIntersect, "mouseLeave")
    ) {
      this.runObjectInteraction(this._lastIntersect, "mouseLeave");
    }

    this.runObjectInteraction(intersect, "mouseOver");
    this._lastIntersect = intersect;
  }

  handleClick(intersect) {
    const obj = intersect?.object;
    if (!obj) return;
    this.runObjectInteraction(intersect, "mouseClick");
  }
}

export default InteractionHandler;
