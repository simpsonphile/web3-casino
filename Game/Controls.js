class Controls {
  constructor({
    onKeyDown,
    onMouseMove,
    onMouseClick,
    onRightMouseClick,
    onKeyUp,
    onWheel,
  }) {
    this.onKeyDownProps = onKeyDown;
    this.onMouseMoveProps = onMouseMove;
    this.onMouseClickProps = onMouseClick;
    this.onRightMouseClickProps = onRightMouseClick;
    this.onKeyUpProps = onKeyUp;
    this.onWheelProps = onWheel;

    this._key_map = {};
  }

  getKeyMap() {
    return Object.keys(this._key_map).filter(
      (key) => this._key_map[key] === true
    );
  }

  init() {
    document.addEventListener("keydown", (event) => {
      this._key_map[event.code] = true;
      this?.onKeyDownProps?.(this.getKeyMap());
    });

    document.addEventListener("keyup", (event) => {
      this._key_map[event.code] = false;
      this?.onKeyUpProps?.(event.code, this.getKeyMap());
    });

    document.addEventListener("mousemove", (event) => {
      if (!this.controlsEnabled) return;

      this.onMouseMoveProps?.(event, this.getKeyMap());
    });

    document.addEventListener("click", (event) => {
      if (!this.controlsEnabled) return;

      if (event.button === 0) {
        this.onMouseClickProps?.(event, this.getKeyMap());
      }
    });

    document.addEventListener("wheel", (event) => {
      if (!this.controlsEnabled) return;

      this.onWheelProps(event.deltaY > 0 ? "up" : "down");
    });
  }

  setControlsEnabled(state) {
    this.controlsEnabled = state;
  }
}

export default Controls;
